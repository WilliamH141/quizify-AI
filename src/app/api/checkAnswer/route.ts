import { prisma } from "@/lib/db";
import { checkAnswerSchema } from "@/schemas/form/quiz";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { strict_output } from "@/lib/gpt";

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json();
        const {questionId, userAnswer} = checkAnswerSchema.parse(body)
        const question = await prisma.question.findUnique({
            where: {id: questionId}
        })
        if (!question) {
            return NextResponse.json(
                {
                    error: "question not found"
                },
                {
                    status: 404
                }
            )
        }
        await prisma.question.update({
            where: {id: questionId},
            data: {
                userAnswer
            }
        })
        if (question.questionType === "mcq") {
            const isCorrect = question.answer.toLowerCase().trim() === userAnswer.toLowerCase().trim()
            await prisma.question.update({
                where: {id: questionId},
                data: {
                    isCorrect
                }
            })
            return NextResponse.json(
                {
                    isCorrect
                },
                {
                    status: 200
                }
            )
        } else if (question.questionType === "open_ended") {
            //use chatgpt to evaluate open-ended answers
            const output = await strict_output(
                `You are an expert evaluator of student answers. Evaluate if the user's answer is correct or acceptable for the given question. Consider equivalent answers, synonyms, and correct conceptual understanding. Be fair but accurate.`,
                `Question: ${question.question}\n\nCorrect Answer: ${question.answer}\n\nUser's Answer: ${userAnswer}`,
                {
                    isCorrect: "true or false",
                    feedback: "A brief, encouraging explanation of whether the answer is correct and why (1-2 sentences)"
                },
                "",
                false,
                "gpt-4o-mini",
                0.1
            )
            
            const isCorrect = output.isCorrect === "true" || output.isCorrect === true
            
            await prisma.question.update({
                where: {id: questionId},
                data: {
                    isCorrect
                }
            })
            return NextResponse.json(
                {
                    isCorrect,
                    feedback: output.feedback
                },
                {
                    status: 200
                }
            )
        }
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                {
                    error: error.issues,
                },
                {
                    status: 400
                }
            )
        }
        console.error("Error checking answer:", error)
        return NextResponse.json(
            {
                error: "Failed to check answer"
            },
            {
                status: 500
            }
        )
    }
}
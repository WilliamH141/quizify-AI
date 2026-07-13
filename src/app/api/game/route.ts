import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { quizCreationSchema } from "@/schemas/form/quiz";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { generateQuestions, type MCQQuestion } from "@/lib/questions";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: "You need to be logged in to perform this action" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { amount, topic, type } = quizCreationSchema.parse(body);
    const game = await prisma.game.create({
      data: {
        gameType: type,
        timeStarted: new Date(),
        userId: session.user.id,
        topic,
      },
    });

    const questions = await generateQuestions({ amount, topic, type });

    if (!questions || questions.length === 0) {
      // Question generation failed; don't leave an empty orphan game behind.
      await prisma.game.delete({ where: { id: game.id } });
      return NextResponse.json(
        { error: "Failed to generate questions. Please try again." },
        { status: 500 },
      );
    }

    if (type == "mcq") {
      const manyData = (questions as MCQQuestion[]).map((question) => {
        let options = [
          question.answer,
          question.option1,
          question.option2,
          question.option3,
        ];
        options = options.sort(() => Math.random() - 0.5);
        return {
          question: question.question,
          answer: question.answer,
          options: JSON.stringify(options),
          gameId: game.id,
          questionType: "mcq" as const,
        };
      });
      await prisma.question.createMany({
        data: manyData,
      });
    } else if (type === "open_ended") {
      const manyData = questions.map((question) => {
        return {
          question: question.question,
          answer: question.answer,
          gameId: game.id,
          questionType: "open_ended" as const,
        };
      });

      await prisma.question.createMany({
        data: manyData,
      });
    }

    return NextResponse.json({
      gameId: game.id,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("API /game error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 },
    );
  }
}

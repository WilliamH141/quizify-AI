import { NextResponse } from "next/server";
import { quizCreationSchema } from "@/schemas/form/quiz";
import { ZodError } from "zod";
import { strict_output } from "@/lib/gpt";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { amount, topic, type } = quizCreationSchema.parse(body);

    let questions: any;

    if (type === "open_ended") {
      questions = await strict_output(
        "You are a helpful ai that is able to generate a pair of questions and answers. the length of the answer should never exceed 15 words. store all the pairs of answers an questions in a JSON array",
        new Array(amount).fill(
        `You are to generate a random hard open-ended question about ${topic}`),
        {
          question: "question",
          answer: "answer with max length of 15 words",
        }
      );
    }

    return NextResponse.json({
      questions,
    },
  {
    status: 200,

  });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

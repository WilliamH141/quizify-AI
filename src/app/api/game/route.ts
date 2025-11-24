import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { quizCreationSchema } from "@/schemas/form/quiz";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import axios from 'axios'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: "You need to be logged in to perform this action" },
        { status: 401 }
      );
    }

    const body = await req.json()
    const {amount, topic, type} = quizCreationSchema.parse(body);
    const game = await prisma.game.create({
        data: {
            gameType: type,
            timeStarted: new Date(),
            userId: session.user.id,
            topic

        }
    })

    const response = await axios.post('http://localhost:3000/api/questions', {
        amount, topic, type
    })

  } catch (error) {
    if (error instanceof ZodError) {
        return NextResponse.json(
      { error: error.issues },
      { status: 400 }
    ); 
    }
    return NextResponse.json({
        error: "Something went wrong"
    })
  }
}

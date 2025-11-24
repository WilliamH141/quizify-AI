import { getAuthSession } from "@/lib/nextauth";
import { quizCreationSchema } from "@/schemas/form/quiz";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

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
    

  } catch (error) {
    if (error instanceof ZodError) {
        return NextResponse.json(
      { error: error.issues },
      { status: 400 }
    ); 
    }
  }
}

import { prisma } from "@/lib/db";
import { endGameSchema } from "@/schemas/form/quiz";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { gameId } = endGameSchema.parse(body);
    const game = await prisma.game.findUnique({
      where: { id: gameId },
    });
    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    // Only record the end time once, so reloading the stats page or retrying
    // doesn't keep extending the recorded duration.
    if (!game.timeEnded) {
      await prisma.game.update({
        where: { id: gameId },
        data: { timeEnded: new Date() },
      });
    }

    return NextResponse.json({ message: "Game ended" }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Error ending game:", error);
    return NextResponse.json(
      { error: "Failed to end game" },
      { status: 500 },
    );
  }
}

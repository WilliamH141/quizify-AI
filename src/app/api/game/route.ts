import { getAuthSession } from "@/lib/nextauth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: "You need to be logged in to perform this action" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Request received" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

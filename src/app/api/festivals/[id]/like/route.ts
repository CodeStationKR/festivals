import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const festival = await prisma.festival.update({
      where: {
        id: params.id,
      },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(festival);
  } catch (error) {
    console.error("Error liking festival:", error);
    return NextResponse.json(
      { error: "Failed to like festival" },
      { status: 500 }
    );
  }
}

import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const { email, code } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.verificationCode !== code) {
      return NextResponse.json(
        { error: "Invalid verification Code" },
        { status: 400 },
      );
    }

    try {
      await prisma.user.update({
        where: { email },
        data: { verified: true, verificationCode: null },
      });

      return NextResponse.json(
        {
          message: "Email verified successfully",
        },
        { status: 200 },
      );
    } catch (error) {
      return NextResponse.json(
        { error: "User registration failed" },
        { status: 500 },
      );
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
}

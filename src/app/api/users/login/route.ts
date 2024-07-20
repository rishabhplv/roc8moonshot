import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const { email, password } = await req.json();

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return NextResponse.json(
          { error: "Invalid Email or Password" },
          { status: 401 },
        );
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return NextResponse.json({ token }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Login Failed" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
}

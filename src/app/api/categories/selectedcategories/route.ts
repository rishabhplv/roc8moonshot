import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const { categoryId } = await req.json();

    try {
      const authorizationHeader = req.headers.get("authorization");
      const token = authorizationHeader?.split(" ")[1];

      if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const { userId } = jwt.verify(token, process.env.JWT_SECRET) as {
        userId: number;
      };

      const existingInterest = await prisma.userCategory.findUnique({
        where: { userId_categoryId: { userId, categoryId } },
      });

      if (existingInterest) {
        await prisma.userCategory.delete({
          where: { userId_categoryId: { userId, categoryId } },
        });
      } else {
        await prisma.userCategory.create({
          data: { userId, categoryId },
        });
      }

      return NextResponse.json(
        {
          message: "Category selection updated successfully",
        },
        { status: 200 },
      );
    } catch (error) {
      return NextResponse.json(
        { error: "Updating category selection failed" },
        { status: 500 },
      );
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
}

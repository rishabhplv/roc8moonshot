import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  if (req.method === "GET") {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") ?? "1";

    const itemsPerPage = 6;

    try {
      const authorizationHeader = req.headers.get("authorization");
      const token = authorizationHeader?.split(" ")[1];

      if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const { userId } = jwt.verify(token, process.env.JWT_SECRET) as {
        userId: number;
      };

      const categories = await prisma.category.findMany({
        skip: (Number(page) - 1) * itemsPerPage,
        take: itemsPerPage,
      });

      const totalCategories = await prisma.category.count();
      const totalPages = Math.ceil(totalCategories / itemsPerPage);

      const userInterests = await prisma.userCategory.findMany({
        where: { userId },
      });

      const categoriesWithSelection = categories.map((category) => ({
        ...category,
        isSelected: userInterests.some(
          (interest) => interest.categoryId === category.id,
        ),
      }));

      return NextResponse.json(
        { categories: categoriesWithSelection, totalPages },
        { status: 200 },
      );
    } catch (error) {
      return NextResponse.json(
        { error: "Fetching Categories failed" },
        { status: 500 },
      );
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
}

import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  try {
    for (let i = 0; i < 100; i++) {
      await prisma.category.create({
        data: {
          name: faker.commerce.department(),
        },
      });
    }
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then((): void => {
    console.log("Database seeded");
  })
  .catch((error: unknown): void => {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred.");
    }
  });

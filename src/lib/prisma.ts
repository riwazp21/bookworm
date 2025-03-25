import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient(
    // @ts-ignore ✅ ignore this block during type checking
    {
      __internal: {
        engine: {
          enablePreparedStatements: false,
        },
      },
    }
  );

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

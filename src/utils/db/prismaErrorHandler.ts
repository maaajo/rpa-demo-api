import { Prisma } from "@prisma/client";

const getPrismaErrorMessage = (error: any) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      const errorFields = error.meta!.target as string[];
      return `This ${errorFields[0]} address is already taken.`;
    }
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return "";
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    return "";
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return "";
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return "";
  }

  return "";
};

export { getPrismaErrorMessage };

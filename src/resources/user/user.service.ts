import { db } from "../../db/prisma.db";
import { Prisma, Role } from "@prisma/client";
import { excludeFields } from "../../utils/db/excludeFieldsFromPrismaReturn";
import * as bcrypt from "bcrypt";

const createNewUser = async (user: Prisma.UserCreateArgs["data"]) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  const userDataToCreate = {
    ...user,
    role: Role.USER,
    password: hashedPassword,
  };

  const createdUser = await db.user.create({ data: userDataToCreate });

  const createdUserWithoutPassword = excludeFields(createdUser, [
    "password",
    "isSuspended",
    "lastFailedLoggedDate",
    "lastSuccessfulLoggedDate",
    "role",
  ]);

  return createdUserWithoutPassword;
};

const getUserByEmail = async (email: string) => {
  const result = await db.user.findUnique({
    where: { email },
    select: { password: true, role: true },
  });

  return result;
};

const insertLastFailedAuthAttempt = async (userEmail: string) => {
  await db.user.update({
    where: { email: userEmail },
    data: { lastFailedLoggedDate: new Date() },
  });
};

const insertSuccessAuthAttempt = async (userEmail: string) => {
  await db.user.update({
    where: { email: userEmail },
    data: { lastSuccessfulLoggedDate: new Date() },
  });
};

export {
  createNewUser,
  getUserByEmail,
  insertLastFailedAuthAttempt,
  insertSuccessAuthAttempt,
};

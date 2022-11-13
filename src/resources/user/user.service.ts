import { db } from "../../db/prisma.db";
import { Prisma, Role, User } from "@prisma/client";
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

  return createdUser;
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

const cleanUserResponse = (user: User) => {
  return excludeFields(user, [
    "id",
    "password",
    "lastFailedLoggedDate",
    "lastSuccessfulLoggedDate",
    "role",
  ]);
};

export {
  createNewUser,
  getUserByEmail,
  insertLastFailedAuthAttempt,
  insertSuccessAuthAttempt,
  cleanUserResponse,
};

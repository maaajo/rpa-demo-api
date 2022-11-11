import { db } from "../../db/prisma.db";
import { Prisma, Role } from "@prisma/client";
import { excludeFields } from "../../utils/db/excludeFields";
import * as bcrypt from "bcrypt";

const createNewUser = async (user: Prisma.UserCreateArgs["data"]) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  const userDataToCreate = {
    ...user,
    role: Role.USER,
    password: hashedPassword,
  };

  const createdUser = await db.user.create({ data: userDataToCreate });

  const createdUserWithoutPassword = excludeFields(createdUser, "password");

  return createdUserWithoutPassword;
};

export { createNewUser };

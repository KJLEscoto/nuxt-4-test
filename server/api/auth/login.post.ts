import { compare } from "bcrypt-ts";
import { eq } from "drizzle-orm";
import { usersTable } from "~~/server/db/schema";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  if (!username || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Username and password must be provided in the data body.",
    });
  }

  const db = useDrizzle();

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username))
    .limit(1)
    .get();

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: "User could not be found.",
    });
  }

  const ok = await compare(password, user.password);
  if (!ok) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid password.",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_PRIVATE!,
    {
      algorithm: "HS256",
      expiresIn: "24hr",
    },
  );

  return { token };
});

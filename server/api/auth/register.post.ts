import { hash } from "bcrypt-ts";
import { usersTable } from "~~/server/db/schema";

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  if (!(username && password)) {
    throw createError({
      statusCode: 400,
      message: "Username and password must be provided in the data body.",
    });
  }

  const hashedPassword = await hash(password, 8);

  const db = useDrizzle();

  const insertResult = await db
    .insert(usersTable)
    .values({
      username: username,
      password: hashedPassword,
    })
    .returning();

  return { insertResult };
});

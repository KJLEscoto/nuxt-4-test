import { compare } from "bcrypt-ts";
import { eq } from "drizzle-orm";
import { usersTable } from "~~/server/db/schema";

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  if (!(username && password)) {
    throw createError({
      statusCode: 400,
      message: "Username and password must be provided in the data body.",
    });
  }

  const db = useDrizzle();

  const user = db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username))
    .limit(1)
    .get();

  if (!user) {
    throw createError({
      statusCode: 404,
      message: "User could not found.",
    });
  }

  if (!(await compare(password, user.password))) {
    throw createError({
      statusCode: 401,
      message: "Invalid password.",
    });
  }
  return { success: true };
});

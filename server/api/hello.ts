// export const database = ["apple", "pear", "grapes", "mango"];

import { fruitsTable } from "../db/schema";
import { useDrizzle } from "../utils/drizzle";

export default defineEventHandler(async (event) => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  // throw createError('error message here');
  const fruits = useDrizzle().select().from(fruitsTable).all();

  return {
    fruits,
  };
});

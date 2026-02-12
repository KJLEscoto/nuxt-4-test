export const database = ["apple", "pear", "grapes", "mango"];

export default defineEventHandler(async (event) => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
 
    // throw createError('error message here');
    return {
    database,
  };
});

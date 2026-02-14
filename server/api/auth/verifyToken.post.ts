import jwt from "jsonwebtoken";

export default defineEventHandler((event) => {
  const token = getCookie(event, "jwt-token");
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "No token" });
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;

  return {
    success: true,
    user: { id: payload.id, username: payload.username },
  };
});

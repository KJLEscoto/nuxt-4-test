import jwt from "jsonwebtoken";
import { JWTUserInfo } from "~~/shared/types/JWTUserInfo";

export default defineEventHandler((event) => {
  const token = getCookie(event, "jwt-token");
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "No token" });
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET!) as JWTUserInfo;

  return {
    success: true,
    user: { id: payload.id, username: payload.username },
  };
});

import type { ErrorRequestHandler } from "express";
import { BAD_REQUEST, CONFLICT, INTERNAL_SERVER_ERROR } from "../constants/http.js";
import { Prisma } from "../generated/prisma/client.js";




const errorHandler:ErrorRequestHandler=(error, req, res, next)=>{
  
  if (error instanceof SyntaxError && "body" in error) {
    return res.status(BAD_REQUEST).json({
      success: false,
      message: "Invalid JSON format",
    });
  }

if (error instanceof Prisma.PrismaClientKnownRequestError) {
  if (error.code === "P2002") {
    const rawMessage = error.message; // e.g. "Unique constraint failed on the fields: (`name`)"
    const field = rawMessage.match(/\(`(.+)`\)/)?.[1] || "Field";

    return res.status(CONFLICT).json({
      success: false,
      message: `${field} already exists`,
    });
  }
}


  const status = error.status || error.statusCode || INTERNAL_SERVER_ERROR;

  const message =
    error.message || "Internal Server Error";

  res.status(status).json({
    message,
  });
}

export default errorHandler
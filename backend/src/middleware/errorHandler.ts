import { Prisma } from "@prisma/client";
import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      message: "Validation failed",
      errors: error.flatten().fieldErrors
    });
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      res.status(409).json({ message: "A product with this unique value already exists" });
      return;
    }

    if (error.code === "P2025") {
      res.status(404).json({ message: "Product not found" });
      return;
    }
  }

  console.error(error);
  res.status(500).json({ message: "Internal server error" });
};

import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

import { env } from "@config/env";
import { UnauthorizedError } from "@shared/errors/UnauthorizedError";

interface IPayLoad {
  sub: string;
}

export async function ensureAuthenticated(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError("JWT token is missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = jwt.verify(
      String(token),
      env.JWT_SECRET,
    ) as IPayLoad;

    request.user = {
      id: user_id,
    };
  } catch {
    throw new UnauthorizedError("Invalid JWT token");
  }
}

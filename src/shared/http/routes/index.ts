import { FastifyInstance } from "fastify";

import { healthApp } from "./healthApp";
import { usersRoutes } from "./users.routes";

export async function appRoutes(app: FastifyInstance) {
  app.register(healthApp, { prefix: "/health" });
  app.register(usersRoutes, { prefix: "/users" });
}

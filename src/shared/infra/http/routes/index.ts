import { FastifyInstance } from "fastify";

import { healthApp } from "./healthApp.routes";
import { usersRoutes } from "./users.routes";
import { authRoutes } from "./auth.routes";

export async function appRoutes(app: FastifyInstance) {
  app.register(healthApp, { prefix: "/health" });
  app.register(authRoutes, { prefix: "/auth" });
  app.register(usersRoutes, { prefix: "/users" });
}

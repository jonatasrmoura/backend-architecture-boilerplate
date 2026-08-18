import { FastifyInstance } from "fastify";
import { HealthCheckResponse } from "@shared/errors/errorSchemas";

export async function healthApp(app: FastifyInstance) {
  app.get("/", async (_request, reply): Promise<HealthCheckResponse> => {
    return reply.status(200).send({
      status: "ok",
      timestamp: new Date().toISOString(),
    });
  });
}

import fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import { env } from "@config/env";
import { errorHandler } from "@shared/http/errors/errorHandler";
import { healthApp } from "./healthApp";

export class App {
  private readonly app: FastifyInstance;

  constructor() {
    this.app = fastify({
      logger: env.NODE_ENV !== "test",
    });

    this.configureMiddlewares();
    this.configureErrorHandling();
    this.configureRoutes();
  }

  private configureMiddlewares(): void {
    this.app.register(cors, {
      origin: true,
      credentials: true,
    });
  }

  private configureErrorHandling(): void {
    this.app.setErrorHandler(errorHandler);
  }

  private configureRoutes(): void {
    this.app.register(healthApp);
  }

  // Método público para expor a instância (necessário para testes com app.inject() ou para o Server)
  public getFastifyInstance(): FastifyInstance {
    return this.app;
  }
}

import fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";

import "@shared/containers";

import { env } from "@config/env";
import { errorHandler } from "@shared/errors/errorHandler";
import { appRoutes } from "./routes";

export class App {
  private readonly app: FastifyInstance;

  constructor() {
    this.app = fastify({
      logger: env.NODE_ENV !== "test",
    });

    this.app.setValidatorCompiler(validatorCompiler);
    this.app.setSerializerCompiler(serializerCompiler);

    this.configureMiddlewares();
    this.configureErrorHandling();
    this.configureRoutes();
  }

  private async configureMiddlewares(): Promise<void> {
    this.app.register(cors, {
      origin: true,
      credentials: true,
    });

    this.app.register(fastifySwagger, {
      openapi: {
        info: {
          title: "Backend Architecture Boilerplate API",
          description:
            "Documentação da API desenvolvida com Clean Architecture, SOLID e Fastify.",
          version: "1.0.0",
        },
        servers: [{ url: `http://localhost:${env.PORT}` }],
      },
      transform: jsonSchemaTransform,
    });

    if (env.NODE_ENV !== "production") {
      await this.app.register(fastifySwaggerUi, {
        routePrefix: "/docs",
      });
    }
  }

  private configureErrorHandling(): void {
    this.app.setErrorHandler(errorHandler);
  }

  private configureRoutes(): void {
    this.app.register(appRoutes);
  }

  // Método público para expor a instância (necessário para testes com app.inject() ou para o Server)
  public getFastifyInstance(): FastifyInstance {
    return this.app;
  }
}

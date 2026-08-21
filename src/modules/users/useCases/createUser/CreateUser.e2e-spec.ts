import "reflect-metadata";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { container } from "tsyringe";
import { type FastifyInstance } from "fastify";

import { App } from "@shared/infra/http/App";
import type { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { createUserInMemory } from "@modules/users/utils/userDataInMemory";
import { ICreateUserDTO } from "../../DTOs";

const userData = createUserInMemory[0] as ICreateUserDTO;

describe("Create User Route (E2E / Integration)", () => {
  let appInstance: App;
  let fastifyServer: FastifyInstance;

  beforeEach(async () => {
    container.registerSingleton<IUsersRepository>(
      "UsersRepository",
      UsersRepositoryInMemory,
    );

    appInstance = new App();
    fastifyServer = appInstance.getFastifyInstance();

    await fastifyServer.ready();
  });

  afterAll(async () => {
    await fastifyServer.close();
  });

  it("Should be able to create a new user via POST /users", async () => {
    console.log("USER DATA:", userData);
    const response = await fastifyServer.inject({
      method: "POST",
      url: "/users",
      payload: userData,
    });

    if (response.statusCode !== 201) {
      const responseBody = JSON.parse(response.body);

      if (responseBody.error?.details) {
        console.error(
          "❌ ERRO DE VALIDAÇÃO (ZOD):",
          responseBody.error.details,
        );
      } else {
        console.error("❌ ERRO DE NEGÓCIO OU SERVIDOR:", responseBody);
      }
    }

    expect(response.statusCode).toBe(201);
  });

  it("Should not allow registration with invalid Zod body data", async () => {
    const response = await fastifyServer.inject({
      method: "POST",
      url: "/users",
      payload: {
        name: "Incompleto",
        email: "email-invalido",
        document: "123",
        password: "123",
      },
    });

    expect(response.statusCode).toBe(400);
  });
});

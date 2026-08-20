import "reflect-metadata";
import { describe, beforeEach, it, expect } from "vitest";

import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { NotFoundError } from "@shared/errors/NotFoundError";

describe("CreateUserUseCase", () => {
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to create a new user", async () => {
    await createUserUseCase.execute({
      name: "Jonatas Moura",
      email: "jonatas@example.com",
      document: "866.438.380-45",
      password: "Teste@123",
    });

    const createdUser = await usersRepositoryInMemory.findByEmail(
      "jonatas@example.com",
    );
    expect(createdUser).toBeTruthy();
    expect(createdUser?.name).toBe("Jonatas Moura");
  });

  it("Should not be able to create a user with an existing e-mail", async () => {
    await createUserUseCase.execute({
      name: "Jonatas Moura",
      email: "jonatas@example.com",
      document: "866.438.380-45",
      password: "Teste@123",
    });

    await expect(
      createUserUseCase.execute({
        name: "Jonatas Rosa",
        email: "jonatas@example.com",
        document: "765.856.440-00",
        password: "Teste@123",
      }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it("Should not be able to create a user with an existing document", async () => {
    await createUserUseCase.execute({
      name: "Jonatas Moura",
      email: "jonatas@example.com",
      document: "866.438.380-45",
      password: "Teste@123",
    });

    await expect(
      createUserUseCase.execute({
        name: "Jonatas Rosa",
        email: "jonatas.rosa@example.com",
        document: "866.438.380-45",
        password: "Teste@123",
      }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});

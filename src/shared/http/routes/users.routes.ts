import { FastifyInstance } from "fastify";
import { CreateUserController } from "../../../modules/users/useCases/createUser/CreateUserController";

const createUserController = new CreateUserController();

export async function usersRoutes(app: FastifyInstance) {
  app.post("/", createUserController.handle.bind(createUserController));
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = usersRoutes;
const CreateUserController_1 = require("../../../modules/users/useCases/createUser/CreateUserController");
const createUserController = new CreateUserController_1.CreateUserController();
async function usersRoutes(app) {
    app.post("/", createUserController.handle.bind(createUserController));
}
//# sourceMappingURL=users.routes.js.map
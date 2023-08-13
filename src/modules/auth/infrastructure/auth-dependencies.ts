import userDependencies from "../../user/infrastructure/user-dependencies";
import { AuthServices } from "../application/auth-services";
import { AuthController } from "./http/controllers/auth-controller";
import { AuthRouter } from "./http/routes/auth.routes";

const authServices = new AuthServices(userDependencies.services);
const authController = new AuthController(authServices);
const authRouter = new AuthRouter(authController);

const authDependencies = {
	controller: authController,
	services: authServices,
	router: authRouter,
};

export default authDependencies;

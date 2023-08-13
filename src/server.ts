import cookieParser from "cookie-parser";
import express, { Router } from "express";
import cors from "cors";
import helmet from "helmet";
import responseTime from "response-time";

import { correlationIdMiddleware } from "./middlewares/correlation-id.middleware";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { Route } from "./types/vendors/route";
import { errorMiddleware } from "./middlewares/error.middleware";
import { projectConfig } from "./config";

export class Server {
	private app: express.Application;
	private port: number;

	constructor(appInit: {
		port?: number;
		middlewares: unknown[];
		routes: Route[];
	}) {
		this.app = express();
		this.port = appInit.port || projectConfig.server.port || 0;

		this.middlewares(appInit.middlewares);
		this.routes(appInit.routes);
		this.initializeErrorHandling();
	}

	private middlewares(middlewares: {
		forEach: (arg0: (middleware: unknown) => void) => void;
	}) {
		// this.app.use(loggerMiddleware);
		this.app.use(responseTime());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(express.static("public"));
		this.app.use("*", correlationIdMiddleware);
		this.app.use(cors());
		this.app.enable("trust proxy");
		this.app.use(helmet());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cookieParser());
		this.app.set("json spaces", 4);

		middlewares.forEach((middleware: express.RequestHandler) => {
			this.app.use(middleware);
		});
	}

	private routes(routes: {
		forEach: (arg0: (route: { router: Router }) => void) => void;
	}) {
		this.app.use("/public", express.static("public"));
		this.app.get(["/", "/health-check"], async (_req, res) => {
			const healthcheck = {
				uptime: process.uptime(),
				message: "OK",
				timestamp: Date.now(),
			};
			try {
				res.send(healthcheck);
			} catch (error) {
				healthcheck.message = error;
				res.status(503).send();
			}
		});

		routes.forEach((route) => {
			this.app.use("/v1", route.router);
		});
	}

	private initializeErrorHandling() {
		this.app.use(errorMiddleware);
	}

	public listen(cb?: () => void) {
		try {
			if (cb) return this.app.listen(this.port, cb);

			return this.app.listen(this.port, function () {
				console.log(
					`🚀 App running on http://localhost:${this.address().port}`
				);
			});
		} catch (error) {
			console.error(error);
		}
	}

	public getServer() {
		return this.app;
	}
}

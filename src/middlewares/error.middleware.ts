import { NextFunction, Request, Response } from "express";
import { projectConfig } from "../config";
import HttpException from "../exceptions/http.exception";

export const errorMiddleware = (
	error: HttpException,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// req.log.debug(`Error: ${error.status} — ${error.message}`);

	try {
		const status: number = error.status || 500;
		const message: string = error.message || "Something went wrong";
		const documentation: string =
			error.documentation || projectConfig.documentationUrl;

		console.log(error.stack);

		res.status(status).json({
			error: {
				status,
				message,
				documentation,
			},
		});
	} catch (error) {
		next(error);
	}
};

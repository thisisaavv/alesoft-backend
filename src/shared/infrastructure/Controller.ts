import { NextFunction, Request, Response } from "express";

export interface Controller {
	run(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<void>;
}

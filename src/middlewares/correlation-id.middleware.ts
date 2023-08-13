import { randomUUID } from "crypto";
import { NextFunction, Request, Response } from "express";

export const CORRELATION_ID_HEADER = "X-Correlation-Id";

export const correlationIdMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const correlationId = req.headers[CORRELATION_ID_HEADER] || randomUUID();
	res.setHeader(CORRELATION_ID_HEADER, correlationId);
	next();
};

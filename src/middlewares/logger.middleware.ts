import PinoHttp from "pino-http";
import { logger } from "../shared/infrastructure/logger/pino-logger";
import { CORRELATION_ID_HEADER } from "./correlation-id.middleware";

export const loggerMiddleware = PinoHttp({
	logger,
	// autoLogging: false,
	msgPrefix: "[HTTP] ",
	customProps: (req, res) => {
		return {
			correlation: req.headers[CORRELATION_ID_HEADER],
		};
	},
	customSuccessMessage(req, res, responseTime) {
		return `"${req.method} ${req.url} HTTP/${req.httpVersion}" ${res.statusCode} ${responseTime}ms`;
	},
	customErrorMessage(req, res, error) {
		return `"${req.method} ${req.url} HTTP/${req.httpVersion}" ${res.statusCode}`;
	},
	timestamp: () => `,"time": "${new Date().toISOString()}"`,
	customLogLevel: function (req, res, err) {
		if (res.statusCode >= 500 || err) return "error";
		if (res.statusCode >= 400) return "warn";
		if (res.statusCode >= 100) return "info";
		if (res.statusCode === 0) return "silent";

		return "debug";
	},
});

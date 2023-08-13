import { pino } from "pino";
import pretty from "pino-pretty";
import { Logger } from "../../domain/logger";

const levels = {
	http: 10,
	debug: 20,
	info: 30,
	warn: 40,
	error: 50,
	fatal: 60,
};

const prettyStream = pretty({
	colorize: true,
	messageKey: "message",
});

export const logger = pino(
	{
		level: process.env.PINO_LOG_LEVEL || "info",
		customLevels: levels,
		useOnlyCustomLevels: true,
		messageKey: "message",
		timestamp: () => `,"time": "${new Date().toISOString()}"`,
	},
	{
		write(msg) {
			prettyStream.write(msg);
		},
	}
);

export class PinoLogger implements Logger {
	info(message: string): void {
		logger.info(message);
	}

	error(message: string): void {
		logger.error(message);
	}

	warn(message: string): void {
		logger.warn(message);
	}

	debug(message: string): void {
		logger.debug(message);
	}

	fatal(message: string): void {
		logger.fatal(message);
	}
}

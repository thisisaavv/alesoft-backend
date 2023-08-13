import { projectConfig } from "../../config";
import { EmailSender } from "../domain/email-sender";
import { Logger } from "../domain/logger";
import { GmailEmailSender } from "./email-sender/gmail-email-sender";
import { MailtrapEmailSender } from "./email-sender/mailtrap-email-sender";
import { PinoLogger } from "./logger/pino-logger";

const logger: Logger = new PinoLogger();
let emailSender: EmailSender;

const NODE_ENV = {
	PRODUCTION: "production",
	DEVELOPMENT: "development",
};

if (projectConfig.server.enviroment === NODE_ENV.PRODUCTION) {
	emailSender = new GmailEmailSender(logger);
} else {
	emailSender = new MailtrapEmailSender(logger);
}

export { logger, emailSender };

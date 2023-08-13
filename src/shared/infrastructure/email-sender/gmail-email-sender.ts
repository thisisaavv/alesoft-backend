import { env } from "../../../config/env";
import nodemailer from "../../../config/nodemailer";
import { EmailSender } from "../../domain/email-sender";
import { Logger } from "../../domain/logger";

export class GmailEmailSender implements EmailSender {
	constructor(private readonly logger: Logger) {}

	async sendEmail(
		to: string,
		subject: string,
		text: string,
		html?: string
	): Promise<void> {
		this.logger.info(`Sending ${subject} email to ${to}`);

		const mailOptions = {
			from: env.EMAIL_FROM_NAME_NO_REPLY,
			to,
			subject,
			text,
			html,
		};

		try {
			nodemailer.sendMail(mailOptions);
			this.logger.info(`Email sent: ${mailOptions}`);
		} catch (error) {
			this.logger.error(`Error sending email: ${error}`);
		}
	}
}

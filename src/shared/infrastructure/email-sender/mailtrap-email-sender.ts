import nodemailer from "nodemailer";

import { env } from "../../../config/env";
import { EmailSender } from "../../domain/email-sender";
import { Logger } from "../../domain/logger";

export class MailtrapEmailSender implements EmailSender {
	constructor(private readonly logger: Logger) {}

	async sendEmail(
		to: string,
		subject: string,
		text: string,
		html?: string
	): Promise<void> {
		this.logger.info(`Sending "${subject}" email to ${to}`);

		const mailOptions = {
			from: env.EMAIL_FROM_ADDRESS_NO_REPLY,
			to,
			subject,
			text,
			html,
		};

		const transporter = nodemailer.createTransport({
			host: env.MAILTRAP_HOST,
			port: env.MAILTRAP_PORT,
			auth: {
				user: env.MAILTRAP_USER,
				pass: env.MAILTRAP_PASSWORD,
			},
		});

		try {
			const info = await transporter.sendMail(mailOptions);
			this.logger.info(`Email sent: ${info.messageId}`);
		} catch (error) {
			this.logger.error(`Error sending email: ${error}`);
		}
	}
}

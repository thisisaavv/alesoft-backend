export interface EmailSender {
	sendEmail(
		emailTo: string,
		subject: string,
		text: string,
		html?: string
	): Promise<void>;
}

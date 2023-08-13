import nodemailer from "nodemailer";
import { env } from "./env";

export default nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	auth: {
		user: env.EMAIL_FROM_ADDRESS_NO_REPLY,
		pass: env.GOOGLE_GMAIL_PASSWORD,
	},
});

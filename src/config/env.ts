import { createEnv } from "@t3-oss/env-core";
import { config } from "dotenv";
import { z } from "zod";

config();

export const env = createEnv({
	clientPrefix: "PUBLIC_",
	server: {
		SERVER_PORT: z
			.string()
			.transform((arg) => Number(arg))
			.optional(),
		NODE_ENV: z.string().default("development"),
		DB_POSTGRES_URL: z.string().url(),
		DB_POSTGRES_HOST: z.string(),
		DB_POSTGRES_DEFAULT_SCHEMA: z.string(),
		DB_POSTGRES_USER: z.string().min(1),
		DB_POSTGRES_PASSWORD: z.string(),
		DB_POSTGRES_PORT: z.string().transform((arg) => Array(arg)),
		API_PUBLIC_URL: z.string().url(),
		TOKEN_SECRET: z.string(),
		DOCUMENTATION_URL: z.string().url(),
		GOOGLE_GMAIL_PASSWORD: z.string(),
		TOKEN_EXPIRES_IN: z.string(),
		CLIENT_PUBLIC_URL: z.string().default("http://localhost:3001"),
		CACHE_REDIS_URL: z.string(),
		CACHE_REDIS_PORT: z.string().transform((arg) => Number(arg)),
		CACHE_REDIS_PASSWORD: z.string(),
		EMAIL_FROM_NAME_NO_REPLY: z.string(),
		EMAIL_FROM_ADDRESS_NO_REPLY: z.string().email(),
		MAILTRAP_HOST: z.string(),
		MAILTRAP_PORT: z.string().transform((arg) => Number(arg)),
		MAILTRAP_USER: z.string(),
		MAILTRAP_PASSWORD: z.string(),
	},
	client: {},
	runtimeEnv: process.env,
});

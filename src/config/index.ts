import { env } from "./env";

const projectConfig = {
	database: {
		type: "postgres",
		stringConnection: env.DB_POSTGRES_URL,
		host: env.DB_POSTGRES_HOST,
		password: env.DB_POSTGRES_PASSWORD,
		user: env.DB_POSTGRES_USER as string,
		defaultSchema: env.DB_POSTGRES_DEFAULT_SCHEMA,
	},
	documentationUrl: env.DOCUMENTATION_URL,
	token: {
		secret: env.TOKEN_SECRET as string,
	},
	server: {
		port: env.SERVER_PORT as number,
		enviroment: env.NODE_ENV as string,
		publicURL: env.API_PUBLIC_URL as string,
	},
	client: {
		publicURL: env.CLIENT_PUBLIC_URL,
	},
};

export { projectConfig };

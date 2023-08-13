export default interface KyselyConfig {
	readonly dialect: string;
	readonly host: string;
	readonly port: number;
	readonly username: string;
	readonly password: string;
	readonly database: string;
	readonly logging: boolean;
	readonly synchronize: boolean;
	readonly entities: string[];
	readonly migrations: string[];
	readonly cli: {
		readonly migrationsDir: string;
	};
}

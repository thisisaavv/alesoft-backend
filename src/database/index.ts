import { Kysely, PostgresDialect } from "kysely";
// import { DB } from "kysely-codegen";
import { Pool } from "pg";

import { env } from "../config/env";
import { DB } from "./types";

export const db = new Kysely<DB>({
	dialect: new PostgresDialect({
		pool: new Pool({
			connectionString: env.DB_POSTGRES_URL,
		}),
	}),
});

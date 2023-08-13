import jsonWebToken from "jsonwebtoken";
import { env } from "../../config/env";

export class JWT {
	constructor(
		private readonly secret: jsonWebToken.Secret = "myR@nd0mSupeRSeCr3t",
		private readonly expiresIn: string | number = 60 * 60 * 1
	) {}

	sign(
		payload: string | object | Buffer,
		expiresIn?: string | number
	): string {
		const jwtGenerated = jsonWebToken.sign({ payload }, this.secret, {
			expiresIn: expiresIn || this.expiresIn,
		});

		return jwtGenerated;
	}

	verify(token: string): string | jsonWebToken.JwtPayload {
		const jwtVerified = jsonWebToken.verify(token, this.secret);
		return jwtVerified;
	}
}

export class Token {
	private static _instance: Token;
	private jwt = new JWT(env.TOKEN_SECRET, env.TOKEN_EXPIRES_IN);

	public static get instance(): Token {
		return this._instance || (this._instance = new this());
	}

	create(payload: string | object | Buffer, expiresIn?: number): string {
		const token = this.jwt.sign(payload, expiresIn);
		return token;
	}

	verify(token: string): any {
		const verifiedToken = this.jwt.verify(token);
		return verifiedToken;
	}
}

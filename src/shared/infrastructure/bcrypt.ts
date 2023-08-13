import bcrypt from "bcrypt";

export class Bcrypt {
	private static _instance: Bcrypt;

	public static get instance(): Bcrypt {
		return this._instance || (this._instance = new this());
	}

	async hashAsync(data: string | Buffer): Promise<string> {
		const dataHashed = await bcrypt.hash(data, 10);
		return dataHashed;
	}

	async compareAsync(
		data: string | Buffer,
		encrypted: string
	): Promise<boolean> {
		const verifiedData = await bcrypt.compare(data, encrypted);
		return verifiedData;
	}
}

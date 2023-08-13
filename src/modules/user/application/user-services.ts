import { env } from "../../../config/env";
import { HttpException, NotFoundException } from "../../../exceptions";
import { EmailSender } from "../../../shared/domain/email-sender";
import { Bcrypt } from "../../../shared/infrastructure/bcrypt";
import { Options } from "../../../types";
import { UserRepository } from "../domain/user-repository";
import { User } from "../domain/user.model";

export class UserServices {
	private readonly bcrypt = Bcrypt.instance;

	constructor(
		private readonly userRepository: UserRepository,
		private readonly emailSender: EmailSender
	) {}

	public async findServeral(options: Options): Promise<User[]> {
		const where: object = {};
		const itemsFound = await this.userRepository.findMany({
			pagination: options.pagination,
			where,
		});

		return itemsFound;
	}

	public async findByEmail(email: string): Promise<User> {
		const itemFound = await this.userRepository.findByEmail(email);
		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async findByUsername(username: string): Promise<User> {
		const itemFound = await this.userRepository.findByUsername(username);
		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async findById(id: string): Promise<User> {
		const itemFound = await this.userRepository.findById(id);
		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async getUserInfo(id: string): Promise<User> {
		const itemFound = await this.userRepository.findById(id);
		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async createOne(data: User): Promise<User> {
		const userAlreadyExists = await this.userRepository.findByEmail(
			data.email
		);
		if (userAlreadyExists)
			throw new HttpException(409, "User already exists");

		const hashedPassword = await this.bcrypt.hashAsync(data.password);
		data.password = hashedPassword;
		data.username = String(data.username).toLowerCase();

		const itemCreated = await this.userRepository.createOne(data);
		if (!itemCreated) throw new Error("No item created");

		if (itemCreated.email) {
			this.emailSender.sendEmail(
				itemCreated.email,
				"Bienvenido a la plataforma",
				`Bienvenido a la plataforma. Gracias por registrarte. Si no has solicitado la creación de una cuenta de usuario, ignora este mensaje.`,
				`
					<h1>Bienvenido a la plataforma</h1>
					<p>Gracias por registrarte en la plataforma.</p>
					<p>Si no has solicitado la creación de una cuenta de usuario, ignora este mensaje.</p>
				`
			);

			this.emailSender.sendEmail(
				itemCreated.email,
				"Confirma tu cuenta de usuario",
				`Por favor, confirma tu cuenta de usuario haciendo click en el siguiente enlace: ${env.CLIENT_PUBLIC_URL}/account-confirmation`,
				`
					<h1>Confirma tu cuenta de usuario</h1>
					<p>Por favor, confirma tu cuenta de usuario haciendo click en el siguiente enlace: <a href="${env.CLIENT_PUBLIC_URL}/account-confirmation">Confirmar cuenta</a></p>
					<p>Si no has solicitado la creación de una cuenta de usuario, ignora este mensaje.</p>
				`
			);
		}

		return itemCreated;
	}

	public async updateById(id: string, data: Partial<User>) {
		const itemUpdated = await this.userRepository.updateById(id, data);
		if (!itemUpdated) {
			throw new Error("No item updated");
		}

		return itemUpdated;
	}

	public async deleteById(id: string): Promise<User> {
		const itemDeleted = await this.userRepository.deleteById(id);
		if (!itemDeleted) {
			throw new Error("No item deleted");
		}

		return itemDeleted;
	}

	public async deleteMany(ids: string[]) {
		const itemsDeleted = await this.userRepository.deleteMany(ids);
		if (!itemsDeleted) {
			throw new Error("No items deleted");
		}

		return itemsDeleted;
	}
}

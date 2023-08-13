import { projectConfig } from "../../../../config";
import { HttpException } from "../../../../exceptions";
import { Result } from "../../../../shared/domain/Result";
import { UseCase } from "../../../../shared/domain/UseCase";
import { EmailSender } from "../../../../shared/domain/email-sender";
import { Bcrypt } from "../../../../shared/infrastructure/bcrypt";
import { UserRepository } from "../../domain/user-repository";
import { User } from "../../domain/user.model";

export class UserCreator implements UseCase<User, User> {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly bcrypt: Bcrypt,
		private readonly emailSender: EmailSender
	) {}

	async execute(data?: User) {
		const userAlreadyExists = await this.userRepository.findByEmail(
			data.email
		);
		if (userAlreadyExists) {
			throw new HttpException(409, "User already exists");
		}

		const hashedPassword = await this.bcrypt.hashAsync(data.password);
		data.password = hashedPassword;

		const itemCreated = await this.userRepository.createOne(data);
		if (!itemCreated) throw new Error("No item created");

		if (itemCreated.email) {
			this.emailSender.sendEmail(
				itemCreated.email,
				"Bienvenido a la plataforma",
				`Bienvenido a la plataforma`
			);
			this.emailSender.sendEmail(
				itemCreated.email,
				"Confirma tu cuenta de usuario",
				`Por favor, confirma tu cuenta de usuario haciendo click en el siguiente enlace: ${projectConfig.client.publicURL}/confirm-account`
			);
		}

		return itemCreated;
	}
}

import { HttpException, NotFoundException } from "../../../exceptions";
import { Options } from "../../../types";
import { JobRepository } from "../domain/job-repository";
import { Job } from "../domain/job.model";

export class JobServices {
	constructor(private readonly jobRepository: JobRepository) {}

	public async findServeral(options: Options): Promise<Job[]> {
		const where: object = {};

		const itemsFound = await this.jobRepository.findMany({
			pagination: options.pagination,
			where,
		});

		return itemsFound;
	}

	public async findById(id: string): Promise<Job> {
		const itemFound = await this.jobRepository.findById(id);

		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async createOne(data: Job): Promise<Job> {
		const itemAlreadyExists = await this.jobRepository.findByName(
			data.name
		);
		if (itemAlreadyExists) {
			throw new HttpException(409, "User already exists");
		}

		const itemCreated = await this.jobRepository.createOne(data);
		if (!itemCreated) throw new Error("No item created");

		return itemCreated;
	}

	public async updateById(id: string, data: Partial<Job>): Promise<Job> {
		const itemUpdated = await this.jobRepository.updateById(id, data);
		if (!itemUpdated) {
			throw new Error("No item updated");
		}

		return itemUpdated;
	}

	public async deleteById(id: string): Promise<Job> {
		const itemDeleted = await this.jobRepository.deleteById(id);

		if (!itemDeleted) {
			throw new Error("No item deleted");
		}

		return itemDeleted;
	}

	public async deleteMany(ids: string[]) {
		const itemsDeleted = await this.jobRepository.deleteMany(ids);

		if (!itemsDeleted) {
			throw new Error("No items deleted");
		}

		return itemsDeleted;
	}
}

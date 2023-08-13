import { HttpException, NotFoundException } from "../../../exceptions";
import { Options } from "../../../types";
import { CompanyRepository } from "../domain/company-repository";
import { Company } from "../domain/company.model";

export class CompanyServices {
	constructor(private readonly companyRepository: CompanyRepository) {}

	public async findServeral(options: Options): Promise<Company[]> {
		const where: object = {};

		const itemsFound = await this.companyRepository.findMany({
			pagination: options.pagination,
			where,
		});

		return itemsFound;
	}

	public async findById(id: string): Promise<Company> {
		const itemFound = await this.companyRepository.findById(id);

		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async createOne(data: Company): Promise<Company> {
		const itemAlreadyExists = await this.companyRepository.findByName(
			data.name
		);
		if (itemAlreadyExists) {
			throw new HttpException(409, "User already exists");
		}

		const itemCreated = await this.companyRepository.createOne(data);
		if (!itemCreated) throw new Error("No item created");

		return itemCreated;
	}

	public async updateById(
		id: string,
		data: Partial<Company>
	): Promise<Company> {
		const itemUpdated = await this.companyRepository.updateById(id, data);
		if (!itemUpdated) {
			throw new Error("No item updated");
		}

		return itemUpdated;
	}

	public async deleteById(id: string): Promise<Company> {
		const itemDeleted = await this.companyRepository.deleteById(id);

		if (!itemDeleted) {
			throw new Error("No item deleted");
		}

		return itemDeleted;
	}

	public async deleteMany(ids: string[]) {
		const itemsDeleted = await this.companyRepository.deleteMany(ids);

		if (!itemsDeleted) {
			throw new Error("No items deleted");
		}

		return itemsDeleted;
	}
}

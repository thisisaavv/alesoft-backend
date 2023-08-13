import { HttpException, NotFoundException } from "../../../exceptions";
import { Options } from "../../../types";
import { EmployeeRepository } from "../domain/employee-repository";
import { Employee } from "../domain/employee.model";

export class EmployeeServices {
	constructor(private readonly employeeRepository: EmployeeRepository) {}

	public async findServeral(options: Options): Promise<Employee[]> {
		const where: object = {};

		const itemsFound = await this.employeeRepository.findMany({
			pagination: options.pagination,
			where,
		});

		return itemsFound;
	}

	public async findById(id: string): Promise<Employee> {
		const itemFound = await this.employeeRepository.findById(id);

		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async findByUsername(username: string) {
		const itemFound = await this.employeeRepository.findByUsername(
			username
		);

		return itemFound;
	}

	public async findByIdCard(idCard: string): Promise<Employee> {
		const itemFound = await this.employeeRepository.findByIdCard(idCard);

		return itemFound;
	}

	public async createOne(data: Employee): Promise<Employee> {
		const employeeAlreadyExists =
			await this.employeeRepository.findByIdCard(data.id_card);
		if (employeeAlreadyExists) {
			throw new HttpException(409, "User already exists");
		}

		const itemCreated = await this.employeeRepository.createOne(data);
		if (!itemCreated) throw new Error("No item created");

		return itemCreated;
	}

	public async updateById(
		id: string,
		data: Partial<Employee>
	): Promise<Employee> {
		const itemUpdated = await this.employeeRepository.updateById(id, data);
		if (!itemUpdated) {
			throw new Error("No item updated");
		}

		return itemUpdated;
	}

	public async deleteById(id: string): Promise<Employee> {
		const itemDeleted = await this.employeeRepository.deleteById(id);

		if (!itemDeleted) {
			throw new Error("No item deleted");
		}

		return itemDeleted;
	}

	public async deleteMany(ids: string[]) {
		const itemsDeleted = await this.employeeRepository.deleteMany(ids);

		if (!itemsDeleted) {
			throw new Error("No items deleted");
		}

		return itemsDeleted;
	}
}

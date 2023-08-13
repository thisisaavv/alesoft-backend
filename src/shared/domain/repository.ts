import { Options } from "../../types";

export interface IWrite<T> {
	createOne(data: T): Promise<T>;
	createMany(data: T[]): Promise<T[] | number>;
	updateById(id: string, data: Partial<T>): Promise<T | null>;
	updateMany(ids: string[], data: Partial<T>): Promise<T[] | number>;
	deleteById(id: string): Promise<T | null>;
	deleteMany(ids: string[]): Promise<T[] | number>;
}

export interface IRead<T> {
	findMany(options: Options): Promise<T[] | null>;
	findById(id: string): Promise<T | null>;
}

export interface IBaseRepository<T> extends IWrite<T>, IRead<T> {}

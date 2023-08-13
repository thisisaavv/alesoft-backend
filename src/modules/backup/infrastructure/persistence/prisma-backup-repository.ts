import { PrismaClient } from "@prisma/client";
import { runBackup } from "@vorlefan/prisma-backup";

import { BackupRepository } from "../../domain/backup-repository";

export class PrismaBackupRepository implements BackupRepository {
	constructor(private readonly prisma: PrismaClient) {}

	public async createBackup() {
		try {
			const tables = await this.prisma.$transaction([
				this.prisma.user.findMany(),
				this.prisma.employee.findMany(),
				this.prisma.item.findMany(),
				this.prisma.itemModifier.findMany(),
				this.prisma.itemModifierOption.findMany(),
				this.prisma.itemVariant.findMany(),
				this.prisma.itemVariantOption.findMany(),
				this.prisma.category.findMany(),
				this.prisma.purchase.findMany(),
				this.prisma.sale.findMany(),
				this.prisma.provider.findMany(),
			]);

			const backup = await runBackup({
				models: {
					user: tables[0],
					employee: tables[1],
					item: tables[2],
					itemModifier: tables[3],
					itemModifierOption: tables[4],
					itemVariant: tables[5],
					itemVariantOption: tables[6],
					category: tables[7],
					purchase: tables[8],
					sale: tables[9],
					provider: tables[10],
				},
				backupFolderName: "backup-files",
			});

			return backup;
		} catch (error) {
			throw new Error(error);
		}
	}
}

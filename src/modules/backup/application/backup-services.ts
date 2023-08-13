import { HttpException } from "../../../exceptions";
import { BackupRepository } from "../domain/backup-repository";

export class BackupServices {
	constructor(private readonly backupRepository: BackupRepository) {}

	public async createBackup() {
		const backupCreated = await this.backupRepository.createBackup();
		if (!backupCreated) throw new HttpException(400, "Backup not created");

		return backupCreated;
	}
}

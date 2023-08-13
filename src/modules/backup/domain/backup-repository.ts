export interface BackupRepository {
	createBackup(): Promise<boolean>;
}

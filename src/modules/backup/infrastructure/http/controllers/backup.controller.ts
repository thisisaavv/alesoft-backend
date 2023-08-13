import { NextFunction, Request, Response } from "express";

import { BackupServices } from "../../../application/backup-services";

export class BackupController {
	constructor(private readonly backupService: BackupServices) {}

	async createBackup(req: Request, res: Response, next: NextFunction) {
		try {
			const backup = await this.backupService.createBackup();
			res.status(201).json({ backup });
		} catch (error) {
			next(error);
		}
	}
}

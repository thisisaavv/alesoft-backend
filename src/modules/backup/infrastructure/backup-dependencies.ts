import { prisma } from "../../../config/prisma";
import { BackupServices } from "../application/backup-services";
import { BackupController } from "./http/controllers/backup.controller";
import { BackupRouter } from "./http/routes/backup.routes";
import { PrismaBackupRepository } from "./persistence/prisma-backup-repository";

const backupRepository = new PrismaBackupRepository(prisma);
const backupServices = new BackupServices(backupRepository);
const backupController = new BackupController(backupServices);
const backupRouter = new BackupRouter(backupController);

const backupDependencies = {
	controller: backupController,
	services: backupServices,
	repository: backupRepository,
	router: backupRouter,
};

export default backupDependencies;

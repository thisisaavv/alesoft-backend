import { prisma } from "../../../config/prisma";
import { JobServices } from "../application/jobs-services";
import { JobController } from "./http/controllers/job.controller";
import { JobRouter } from "./http/routes/job.routes";
import { PrismaJobRepository } from "./persistence/prisma-job-repository";

const jobRepository = new PrismaJobRepository(prisma);
const jobServices = new JobServices(jobRepository);
const jobController = new JobController(jobServices);
const jobRouter = new JobRouter(jobController);

const jobDependencies = {
	controller: jobController,
	services: jobServices,
	repository: jobRepository,
	router: jobRouter,
};

export default jobDependencies;

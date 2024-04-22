import { ValidateOrderUseCase } from "../application/use-cases/ValidateOrderUseCase";
import { AddClientUseCase } from "../application/use-cases/AddClientUseCase";
import { GetClientsUseCase } from "../application/use-cases/GetClientsUseCase";

import { ValidateOrderController } from "../infrastructure/controllers/ValidateOrderController";
import { AddClientController } from "../infrastructure/controllers/AddClientController";
import { GetClientsController } from "../infrastructure/controllers/GetClientsController";

import { MongodbOrderRepository } from "./adapters/mongodb/repositories/MongodbOrderRepository";
import { MongodbClientRepository } from "./adapters/mongodb/repositories/MongodbClientRepository";

import { SocketService } from "./services/socketIo/SocketService";
import { NotificationService } from "./services/rabbitMq/NotificationService";

const mongodbOrderRepository = new MongodbOrderRepository();
const mongodbClientRepository = new MongodbClientRepository();

const socketService = new SocketService();
const notificationService = new NotificationService();

const validateOrderUseCase = new ValidateOrderUseCase(mongodbOrderRepository, notificationService, socketService);

const addClientUseCase = new AddClientUseCase(mongodbClientRepository);

const getClientsUseCase = new GetClientsUseCase(mongodbClientRepository);

export const validateOrderController = new ValidateOrderController(validateOrderUseCase);

export const addClientController = new AddClientController(addClientUseCase);

export const getClientsController = new GetClientsController(getClientsUseCase);
import { Order } from "../../domain/entities/Order";

export interface INotificationService {
    sendNotification(order: Order, status: string): Promise<boolean>;
}
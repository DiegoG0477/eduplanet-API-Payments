import { Order } from "../../domain/repositories/Order";

export interface INotificationService {
    sendNotification(order: Order, status: string): Promise<boolean>;
}
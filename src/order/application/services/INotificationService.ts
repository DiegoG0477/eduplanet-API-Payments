import { Order } from "../../domain/entities/Order";

export interface INotificationService {
    sendProcessNotification(order: Order, status: string): Promise<boolean>;
    sendMonitoringNotification(order: Order, status: string): Promise<boolean>;
}
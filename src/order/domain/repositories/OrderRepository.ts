import { Order } from "../entities/Order";

export interface OrderRepository {
    validateOrder(order: Order): Promise<boolean>;
}
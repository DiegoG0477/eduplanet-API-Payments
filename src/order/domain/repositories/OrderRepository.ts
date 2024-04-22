import { Order } from "./Order";

export interface OrderRepository {
    validateOrder(order: Order): Promise<boolean>;
}
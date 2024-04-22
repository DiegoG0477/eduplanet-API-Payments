import { Order } from "../../../../domain/repositories/Order";
import { OrderRepository } from "../../../../domain/repositories/OrderRepository";
// import { OrderMongodbModel } from "../schema/MongodbOrderSchema";
import { ClientMongodbModel } from "../schema/MongodbClientSchema";

export class MongodbOrderRepository implements OrderRepository {
    async validateOrder(order: Order): Promise<boolean> {
        const client = await ClientMongodbModel.findOne({ client_id: order.userId });

        if (!client) {
            return false;
        }

        return true;
    }
}
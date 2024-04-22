import { Order } from "../../../../domain/entities/Order";
import { OrderRepository } from "../../../../domain/repositories/OrderRepository";
// import { OrderMongodbModel } from "../schema/MongodbOrderSchema";
import { ClientMongodbModel } from "../schema/MongodbClientSchema";

export class MongodbOrderRepository implements OrderRepository {
    async validateOrder(order: Order): Promise<boolean> {
        console.log('validating order', order);
        const client = await ClientMongodbModel.findOne({ client_id: order.userId });
        console.log(client);
        if (!client) {
            return false;
        }

        return true;
    }
}
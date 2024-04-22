import { Order } from "../../domain/entities/Order";
import { OrderRepository } from "../../domain/repositories/OrderRepository";
import { INotificationService } from "../services/INotificationService";
import { ISocketService } from "../services/ISocketService";

export class ValidateOrderUseCase {
    constructor(
        private orderRepository: OrderRepository,
        private notificationService: INotificationService,
        private socketService: ISocketService
    ) {}

    async run(
        order: Order
    ): Promise<boolean> {
        const valid =  await this.orderRepository.validateOrder(order);

        if (valid) {
            console.log('order aproved');
            await this.notificationService.sendNotification(order, "SUCCESS");
            await this.socketService.responseClient({status:"success", msg:"Order is valid"}, order.userId);
        } else {
            await this.notificationService.sendNotification(order, "ERROR");
            await this.socketService.responseClient({status:"error", msg:"Order is not valid"}, order.userId);
        }

        return valid;
    }
}
import { connect } from "amqplib";
import { Order } from "../../../domain/entities/Order";
import { INotificationService } from "../../../application/services/INotificationService";
import dotenv from "dotenv";

dotenv.config();

export class NotificationService implements INotificationService {
    private options: any;

    constructor() {
        this.options = {
            host: process.env.AMQP_HOSTNAME,
            username: process.env.AMQP_USERNAME,
            password: encodeURIComponent(
                process.env.AMQP_PASSWORD ?? "password"
            ),
            port: process.env.AMQP_PORT,
            exchange: process.env.AMQP_EXCHANGE,
        };
    }

    async sendNotification(order: Order, status:string): Promise<boolean> {
        try {
            console.log(this.options);
            const connection = await connect(
                `amqp://${this.options.username}:${this.options.password}@${this.options.host}:${this.options.port}`
            );
            const channel = await connection.createChannel();
            const exchangeName = this.options.exchange;
            console.log('sending data to rabbitmq paymentqueue', JSON.stringify({orderId: order.id, userId: order.userId, productId: order.productId, status}));
            channel.publish(
                exchangeName,
                "",
                Buffer.from(JSON.stringify({orderId: order.id, userId: order.userId, productId: order.productId, status}))
            );
            await channel.close();
            await connection.close();
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

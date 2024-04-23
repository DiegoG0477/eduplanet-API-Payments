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
            processExchange: process.env.AMQP_PROCESS_EXCHANGE,
            monitoringExchange: process.env.AMQP_MONITORING_EXCHANGE,
        };
    }

    private async sendNotificationToExchange(
        exchangeName: string,
        order: Order,
        status: string
    ): Promise<boolean> {
        try {
            console.log(this.options);
            const connection = await connect(
                `amqp://${this.options.username}:${this.options.password}@${this.options.host}:${this.options.port}`
            );
            const channel = await connection.createChannel();
            console.log(
                `sending data to rabbitmq ${exchangeName}`,
                JSON.stringify({
                    orderId: order.id,
                    userId: order.userId,
                    productId: order.productId,
                    status,
                })
            );
            channel.publish(
                exchangeName,
                "",
                Buffer.from(
                    JSON.stringify({
                        orderId: order.id,
                        userId: order.userId,
                        productId: order.productId,
                        status,
                    })
                )
            );
            await channel.close();
            await connection.close();
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async sendProcessNotification(order: Order, status: string): Promise<boolean> {
        return await this.sendNotificationToExchange(
            this.options.processExchange,
            order,
            status
        );
    }

    async sendMonitoringNotification(
        order: Order,
        status: string
    ): Promise<boolean> {
        return await this.sendNotificationToExchange(
            this.options.monitoringExchange,
            order,
            status
        );
    }
}

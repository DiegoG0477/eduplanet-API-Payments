import { Request, Response } from "express";
import { Order } from "../../domain/entities/Order";
import { ValidateOrderUseCase } from "../../application/use-cases/ValidateOrderUseCase";

export class ValidateOrderController {
    constructor(readonly validateOrderUseCase: ValidateOrderUseCase) {}

    async run(req: Request, res: Response) {
        const data = req.body;

        try {
            const orderObject = new Order(
                data.id,
                data.userId,
                data.productId,
                data.status,
                data.createdAt,
                data.updatedAt
            );

            const isValid = await this.validateOrderUseCase.run(orderObject);

            if (isValid) {
                res.status(200).send({
                    status: "success",
                    message: "Order is valid",
                    data
                });
            } else {
                res.status(400).send({
                    status: "error",
                    message: "Order is not valid",
                    data
                });
            }
        } catch (error) {
            res.status(500).send({
                status: "error",
                message: "An error occurred",
                error: error,
                data
            });
        }
    }
}
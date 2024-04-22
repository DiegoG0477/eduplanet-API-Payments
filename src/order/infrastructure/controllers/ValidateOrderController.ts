import { Request, Response } from "express";
import { ValidateOrderUseCase } from "../../application/use-cases/ValidateOrderUseCase";

export class ValidateOrderController {
    constructor(readonly validateOrderUseCase: ValidateOrderUseCase) {}

    async run(req: Request, res: Response) {
        const order = req.body;

        try {
            const isValid = await this.validateOrderUseCase.run(order);

            if (isValid) {
                res.status(200).send({
                    status: "success",
                    message: "Order is valid",
                    order
                });
            } else {
                res.status(400).send({
                    status: "error",
                    message: "Order is not valid",
                    order
                });
            }
        } catch (error) {
            res.status(400).send({
                status: "error",
                message: "An error occurred",
                error: error,
                order
            });
        }
    }
}
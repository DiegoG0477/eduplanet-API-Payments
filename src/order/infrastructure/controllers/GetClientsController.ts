import { Request, Response } from "express";
import { GetClientsUseCase } from "../../application/use-cases/GetClientsUseCase";

export class GetClientsController {
    constructor(readonly getClientsUseCase: GetClientsUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const clients = await this.getClientsUseCase.getClients();

            if (clients) {
                res.status(200).send({
                    status: "success",
                    message: "Clients found",
                    clients
                });
            } else {
                res.status(400).send({
                    status: "error",
                    message: "Clients not found",
                });
            }
        } catch (error) {
            res.status(400).send({
                status: "error",
                message: "An error occurred",
                error: error
            });
        }
    }
}
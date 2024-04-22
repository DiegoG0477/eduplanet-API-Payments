import { Request, Response } from 'express';
import { AddClientUseCase } from '../../application/use-cases/AddClientUseCase';

export class AddClientController {
    constructor(readonly addClientUseCase: AddClientUseCase) {}

    async run(req: Request, res: Response) {
        const clientId = req.body.clientId;

        try {
            const client = await this.addClientUseCase.addClient(clientId);

            if (client) {
                res.status(200).send({
                    status: 'success',
                    message: 'Client added',
                    client,
                });
            } else {
                res.status(400).send({
                    status: 'error',
                    message: 'Client not added',
                    client,
                });
            }
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: 'An error occurred',
                error: error,
            });
        }
    }
}
import express from 'express';
import {
    addClientController,
    getClientsController
} from '../dependencies';

const clientRouter = express.Router();

clientRouter.post('/', (req, res) => addClientController.run(req, res));
clientRouter.get('/', (req, res) => getClientsController.run(req, res));

export { clientRouter };
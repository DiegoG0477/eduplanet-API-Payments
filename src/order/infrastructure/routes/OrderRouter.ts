import express from 'express';

import {
    validateOrderController
} from '../dependencies';

const orderRouter = express.Router();

orderRouter.post('/validate', (req, res) => validateOrderController.run(req, res));

export { orderRouter };
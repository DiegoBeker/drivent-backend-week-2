import { Router } from 'express';
import { authenticateToken } from '../middlewares';
import paymentsController from '../controllers/payments-controller';

const paymentsRouter = Router();

paymentsRouter.use(authenticateToken);
paymentsRouter.get('/', paymentsController.getTicketPayment);
paymentsRouter.post('/process', paymentsController.processPayment);

export default paymentsRouter;

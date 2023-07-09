import { Router } from 'express';
import { authenticateToken } from '../middlewares';
import ticketsController from '../controllers/tickets-controller';

const ticketsRouter = Router();

ticketsRouter.use(authenticateToken);
ticketsRouter.get('/types', ticketsController.getAllTicketsTypes);
ticketsRouter.get('/', ticketsController.getTicket);
ticketsRouter.post('/', ticketsController.createTicket);

export default ticketsRouter;

import { Router } from 'express';
import validateToken from '../middlewares/validateTokenMiddleware'
import * as testsController from '../controllers/testsController';

const testsRouter = Router();
testsRouter.post("/tests", validateToken, testsController.createTest);

export default testsRouter;
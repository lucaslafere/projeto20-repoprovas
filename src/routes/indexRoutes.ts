import { Router } from 'express';
import userRouter from './userRoutes'
import testsRouter from './testsRoutes'



const router = Router();
router.use(userRouter)
router.use(testsRouter)

export default router;
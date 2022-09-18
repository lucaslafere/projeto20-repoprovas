import { Request, Response} from 'express';
import { TestData } from '../types/testsType';
import { createTestSchema } from '../schemas/testsSchema';
import * as testsService from '../services/testsService';

export async function createTest (req: Request, res: Response) {
    const testDetails: TestData = req.body;
    const { error } = createTestSchema.validate(testDetails);
    if (error) throw {type: 'wrong-body-format', message: error.message}
    await testsService.insert(testDetails);
    res.status(201).send("Created test")
}
export async function getAllTestsByTerms (req: Request, res: Response) {
    const result = await testsService.findAllOrderByTerms();
    res.status(201).send(result)
}
export async function getAllTestsByTeachers (req: Request, res: Response) {
    const result = await testsService.findAllOrderByTeachers();
    res.status(201).send(result)
}
import joi from "joi";
import { TestData } from '../types/testsType'

export const createTestSchema = joi.object<TestData>({
    name: joi.string().trim().required(),
    pdfUrl: joi.string().uri().pattern(/\.pdf$/).trim().required(),
    categoryId: joi.number().integer().strict().required(),
    teacherDisciplineId: joi.number().integer().strict().required(),
});

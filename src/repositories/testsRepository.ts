import { prisma } from "../database";
import { TestData } from '../types/testsType';

export async function insert (testDetails: TestData) {
    const result = await prisma.tests.create({
        data: testDetails
    });
    return result
}
export async function findById (id: number) {
    const result = await prisma.tests.findUnique({where: {id}})
    return result
}

export async function findAll () {
    const result = await prisma.tests.findMany();
    return result;
}

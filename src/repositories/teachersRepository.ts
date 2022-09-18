import { prisma } from '../database';

export async function findAll () {
    const result = await prisma.teachers.findMany()
    return result
}
import { prisma } from '../database';

export async function findAll () {
    const result = await prisma.disciplines.findMany()
    return result
}
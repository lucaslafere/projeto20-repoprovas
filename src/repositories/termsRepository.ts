import { prisma } from '../database';

export async function findAll () {
    const result = await prisma.terms.findMany({
        orderBy: {
            number: "desc"
        }
    })
    return result
}
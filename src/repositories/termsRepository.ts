import { prisma } from '../database'

export async function findAllNames () {
    const result = await prisma.terms.findMany({
        select: {
            number: true
        }
    })
    return result
}
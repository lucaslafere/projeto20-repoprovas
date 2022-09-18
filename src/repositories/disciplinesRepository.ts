import { prisma } from '../database'

export async function findAllNames () {
    const result = await prisma.disciplines.findMany({
        select: {
            name: true
        }
    })
    return result
}
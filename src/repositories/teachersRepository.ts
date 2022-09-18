import { prisma } from "../database";

export async function findAllNames () {
    const result = await prisma.teachers.findMany({
        select: {
            name: true
        }
    })
    return result
}
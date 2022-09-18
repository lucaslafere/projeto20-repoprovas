import { prisma } from "../database";

export async function findById (id: number) {
    const result = await prisma.categories.findUnique({where: {id}})
    return result
}

export async function findAll () {
    const result = await prisma.categories.findMany();
    return result;
}
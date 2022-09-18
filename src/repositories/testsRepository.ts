import { prisma } from "../database";
import connection from '../postgresdatabase'
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

export async function findByTerms () {
    const result = await prisma.terms.findMany({
        where: {},
        distinct: ["number"],
        select: {
            number: true,
            disciplines: {
                distinct: ["name"],
                select: {
                    name: true,
                    teachersDisciplines: {
                        select: {
                            teacher: {select: {name: true}},
                            tests: {
                                select: {
                                    name: true,
                                    pdfUrl: true,
                                    category: {
                                        select: {
                                            name: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
    return result
}

export async function findByTeachers () {
    const result = await prisma.terms.findMany({
        where: {},
        distinct: ["number"],
        select: {
            number: true,
            disciplines: {
                distinct: ["name"],
                select: {
                    name: true,
                    teachersDisciplines: {
                        select: {
                            teacher: {select: {name: true}},
                            tests: {
                                select: {
                                    name: true,
                                    pdfUrl: true,
                                    category: {
                                        select: {
                                            name: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
    return result

}

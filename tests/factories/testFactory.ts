import { faker } from "@faker-js/faker";
import { tests } from "@prisma/client";
import { TestData } from "../../src/types/testsType";
import { prisma } from "../../src/database";
import * as passwordEncrypter from "../../src/utils/passwordEncrypter";

export default async function _testFactory({
  persist = false,
}): Promise<TestData> {
  const teacherDisciplineId = faker.datatype.number({
    min: 1,
    max: 6,
    precision: 1,
  });

  const test = {
    name: faker.word.noun(),
    pdfUrl: faker.internet.url() + ".pdf",
    categoryId: faker.datatype.number({ min: 1, max: 3, precision: 1 }),
    teacherDisciplineId: faker.datatype.number({
      min: 1,
      max: 6,
      precision: 1,
    }),
  };
  if (persist) {
    await prisma.tests.create({
      data: test,
    });

    return test;
  }
  return test;
}

import { tests } from "@prisma/client";

export type TestData = Omit <tests, 'id'>
import { categories } from "@prisma/client";

export type CategoryData = Omit <categories, 'id'>
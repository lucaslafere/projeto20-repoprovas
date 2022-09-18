import { teachersDisciplines } from "@prisma/client";

export type TeacherDisciplineData = Omit <teachersDisciplines, 'id'>
import { TestData } from "../types/testsType";
import * as categoriesRepository from "../repositories/categoriesRepository";
import * as teacherDisciplinesRepository from "../repositories/teacherDisciplinesRepository";
import * as testsRepository from "../repositories/testsRepository";

export async function insert(testDetails: TestData) {
  const findExistingCategory = await categoriesRepository.findById(
    testDetails.categoryId
  );
  if (!findExistingCategory)
    throw {
      type: "NotFound",
      message: "a category with this id was not found",
    };
  const findExistingTeacherDiscipline =
    await teacherDisciplinesRepository.findById(
      testDetails.teacherDisciplineId
    );
  if (!findExistingTeacherDiscipline)
    throw { type: "NotFound", message: "invalid teacherDiscipline id" };
  await testsRepository.insert(testDetails);
}

export async function findAllOrderByTerms() {

}
export async function findAllOrderByTeachers() {
  
}

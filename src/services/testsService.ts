import { TestData } from "../types/testsType";
import * as categoriesRepository from "../repositories/categoriesRepository";
import * as teacherDisciplinesRepository from "../repositories/teacherDisciplinesRepository";
import * as disciplinesRepository from "../repositories/disciplinesRepository";
import * as termsRepository from "../repositories/termsRepository";
import * as testsRepository from "../repositories/testsRepository";
import * as teachersRepository from "../repositories/teachersRepository";

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
    const disciplines = await disciplinesRepository.findAllNames();
    const terms = await termsRepository.findAllNames();
    const categories = await categoriesRepository.findAllNames();
    const teachers = await teachersRepository.findAllNames();
    const finalArray = [];
    for (let term of terms){
        let termData = {term: term.number, testsDiscipline: []};
        for (let discipline of disciplines) {
            let disciplineData = {discipline: discipline.name, testsCategory: []};
            for (let category of categories) {
                const testsData = await testsRepository.findByTerms(term.number, discipline.name, category.name)
                let categoryData = {category: category.name, tests: testsData}
                disciplineData.testsCategory.push(categoryData)
            }
            termData.testsDiscipline.push(disciplineData)
        }
        finalArray.push(termData)
    }
    return finalArray

}
export async function findAllOrderByTeachers() {
  
}

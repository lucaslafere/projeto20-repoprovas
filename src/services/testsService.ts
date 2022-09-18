import * as testsRepository from '../repositories/testsRepository';
import { TestData } from '../types/testsType';
import * as categoriesRepository from '../repositories/categoriesRepository'
import * as teacherDisciplinesRepository from '../repositories/teacherDisciplinesRepository'

export async function insert(
    testDetails: TestData
){
    const findExistingCategory = categoriesRepository.findById(testDetails.categoryId)
    if (!findExistingCategory) throw {type: 'NotFound', message: "a category with this id was not found"}
    const findExistingTeacherDiscipline = teacherDisciplinesRepository.findById(testDetails.teacherDisciplineId);
    if (!findExistingTeacherDiscipline) throw {type: 'NotFound', message: "invalid teacherDiscipline id"}
    await testsRepository.insert(testDetails);

}
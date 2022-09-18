import * as testsRepository from '../repositories/testsRepository';
import { TestData } from '../types/testsType';
import * as categoriesRepository from '../repositories/categoriesRepository'
import * as teacherDisciplinesRepository from '../repositories/teacherDisciplinesRepository'
import * as termsRepository from '../repositories/termsRepository';
import * as disciplinesRepository from '../repositories/disciplinesRepository'
import * as teachersRepository from '../repositories/teachersRepository'

export async function insert(
    testDetails: TestData
){
    const findExistingCategory = await categoriesRepository.findById(testDetails.categoryId)
    if (!findExistingCategory) throw {type: 'NotFound', message: "a category with this id was not found"}
    const findExistingTeacherDiscipline = await teacherDisciplinesRepository.findById(testDetails.teacherDisciplineId);
    if (!findExistingTeacherDiscipline) throw {type: 'NotFound', message: "invalid teacherDiscipline id"}
    await testsRepository.insert(testDetails);

}

export async function findAllOrderByTerms() {
        const findAllTerms = await termsRepository.findAll();
        const findAllDisciplines = await disciplinesRepository.findAll();
        const findAllTeachers = await teachersRepository.findAll();

}
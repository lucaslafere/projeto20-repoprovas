import * as testsRepository from "../repositories/testsRepository";
import { TestData } from "../types/testsType";
import * as categoriesRepository from "../repositories/categoriesRepository";
import * as teacherDisciplinesRepository from "../repositories/teacherDisciplinesRepository";
import * as termsRepository from "../repositories/termsRepository";
import * as disciplinesRepository from "../repositories/disciplinesRepository";
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
  const findAllTerms = await termsRepository.findAll();
  const findAllDisciplines = await disciplinesRepository.findAll();
  const findAllTeachers = await teachersRepository.findAll();
  const findAllTeachersDisciplines =
    await teacherDisciplinesRepository.findAll();
  const findAllTests = await testsRepository.findAll();
  const findAllCategories = await categoriesRepository.findAll();

  const formattedTests = [];

  for (let term of findAllTerms) {
    const termData = {
      period: term.number,
      disciplinesData: [],
    };
    for (let discipline of findAllDisciplines) {
      if (discipline.termId === term.id) {
        const disciplineData: any = {
          disciplineName: discipline.name,
        };
        const teacherDiscipline = findAllTeachersDisciplines.filter(
          (teacherDiscipline) =>
            teacherDiscipline.disciplineId === discipline.id
        );
        const testsDiscipline = findAllTests.filter((el) =>
          teacherDiscipline.some(
            (teacherDiscipline) =>
              teacherDiscipline.id === el.teacherDisciplineId
          )
        );
        const categories = findAllCategories.filter((category) =>
          testsDiscipline.some((tests) => tests.categoryId === category.id)
        );

        disciplineData.categories = categories.map((el) => {
          const categoryData = {
            categoryName: el.name,
            tests: [],
          };
          const testsPeriod = testsDiscipline.filter((el) =>
            categories.some((category) => category.id === el.categoryId)
          );

          for (let test of testsPeriod) {
            const testData = {
              name: test.name,
              pdfUrl: test.pdfUrl,
              teacher: "",
            };
            const teacherId = teacherDiscipline.filter(
              (teacherDiscipline) =>
                teacherDiscipline.id === test.teacherDisciplineId
            );
            const teacher = findAllTeachers.filter(
              (teacher) => teacher.id === teacherId[0].teacherId
            );

            testData.teacher = teacher[0].name;
            categoryData.tests.push(testData);
          }
          return categoryData;
        });
        termData.disciplinesData.push(disciplineData);
      }
    }
    formattedTests.push(termData);
  }
  return formattedTests;
}
export async function findAllOrderByTeachers() {
  const findAllDisciplines = await disciplinesRepository.findAll();
  const findAllTeachers = await teachersRepository.findAll();
  const findAllTeachersDisciplines =
    await teacherDisciplinesRepository.findAll();
  const findAllTests = await testsRepository.findAll();
  const findAllCategories = await categoriesRepository.findAll();

  const formattedTests = [];

  for (let teacher of findAllTeachers) {
    const teacherData = {
      teacher: teacher.name,
      categoriesData: [],
    };
    const teacherDisciplines = findAllTeachersDisciplines.filter(
      (teacher) => teacher.teacherId === teacher.id
    );
    const teacherTests = findAllTests.filter((test) =>
      teacherDisciplines.some(
        (teacher) => test.teacherDisciplineId === teacher.id
      )
    );
    const teacherCategories = findAllCategories.filter((category) =>
      teacherTests.some((teacher) => teacher.categoryId === category.id)
    );

    for (let category of teacherCategories) {
      const categoryData = {
        name: category.name,
        tests: [],
      };
      for (let test of teacherTests) {
        if (test.categoryId !== category.id) {
          const teacherDiscipline = teacherDisciplines.filter(
            (teacher) => teacher.id === test.teacherDisciplineId
          );
          const discipline = findAllDisciplines.filter(
            (discipline) => discipline.id === teacherDiscipline[0].disciplineId
          );

          const testData = {
            name: test.name,
            pdfUrl: test.pdfUrl,
            discipline: discipline[0].name,
          };
          categoryData.tests.push(testData);
        }
        
      }
      teacherData.categoriesData.push(categoryData);
    }
    formattedTests.push(teacherData);
  }
  return formattedTests;
}

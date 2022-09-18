import { faker } from '@faker-js/faker';

export default async function _testFactory() {
    const teacherId = faker.datatype.number({min: 1, max: 2, precision: 1})
    const disciplineId = teacherId === 1 ? faker.datatype.number({min: 1, max: 3, precision: 1}) : faker.datatype.number({min: 4, max: 6, precision: 1});
    
    return {
        name: faker.word.noun,
        pdfUrl: `${faker.internet.url()}.pdf`,
        categoryId: faker.datatype.number({min: 1, max: 3, precision: 1}),
        teacherId,
        disciplineId
    }
}
import { faker } from '@faker-js/faker';

export default async function _userFactory() {
    const password = faker.lorem.word(8)
    return {
        email: faker.internet.email(),
        password: password,
        confirmPassword: password
    }
}
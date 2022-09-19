import { faker } from '@faker-js/faker';
import { users } from '@prisma/client';
import { UserData } from '../../src/types/userType'
import { prisma } from '../../src/database';
import * as passwordEncrypter from '../../src/utils/passwordEncrypter';

type iNewUser= UserData & { confirmPassword: string }
export default async function _userFactory({persist = false}): Promise<users | iNewUser> {
    const password = faker.lorem.word(8)
    const user = {
        email: faker.internet.email(),
        password: password,
        confirmPassword: password
    }
    if (persist) {
        await prisma.users.create({
        data: {
        email: user.email,
        password: passwordEncrypter.hashedPassword(user.password)
        }
      })
      delete user.confirmPassword
      return user
    };
    return user;

}
import supertest from "supertest";
import app from '../src/app'
import { prisma } from "../src/database";
import _userFactory from "./factories/userFactory";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY`;
});

describe('Testa post /sign-up', () => {
    it('Deve retornar 201 ao cadastrar um usuario com body certo', async () => {
        const user = await _userFactory();
        const result = await supertest(app).post('/sign-up').send(user);

        const createdUser = await prisma.users.findUnique({
            where: {email: user.email}
        });
        expect(result.status).toBe(201);
        expect(createdUser).not.toBeNull();
    });
    it('Deve retornar 409 ao tentar cadastrar um usuario que ja exista', async () => {
        const user = {
            email: "bolinha@gmail.com",
            password: "minhasenha",
            confirmPassword: "minhasenha"
        }
        await supertest(app).post('/sign-up').send(user);
        const result = await supertest(app).post('/sign-up').send(user)
        expect(result.status).toBe(409)
    })
    it('Deve retornar 422 ao tentar cadastrar com body errado', async () => {
        const user = await _userFactory();
        delete user.confirmPassword;

        const result = await supertest(app).post('/sign-up').send(user);
        expect(result.status).toBe(422);
    })
})
afterAll(async () => {
    await prisma.$disconnect();
  });
import supertest from "supertest";
import app from '../src/app'
import { prisma } from "../src/database";
import _userFactory from "./factories/userFactory";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY`;
});

describe('Testa POST /sign-in', () => {
    it('Deve retornar 200 caso haja login, e retornar um token', async () => {
        const user = {
            email: "bolinha@gmail.com",
            password: "minhasenha",
            confirmPassword: "minhasenha"
        }
        await supertest(app).post('/sign-up').send(user);
        delete user.confirmPassword
        const result = await supertest(app).post('/sign-in').send(user);
        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Object);
    });
    it('Deve retornar 401 caso envie um body com credenciais erradas', async () => {
        const result = await supertest(app).post('/sign-in').send({email: "teste@gmail.com", password: "megasenha"});
        expect(result.status).toBe(401);
    })
    it('Deve retornar 422 ao tentar entrar com body errado', async () => {
        const user = await _userFactory();
        await supertest(app).post('/sign-up').send(user);
        const result = await supertest(app).post('/sign-in').send(user);
        expect(result.status).toBe(422);
    })
})
afterAll(async () => {
    await prisma.$disconnect();
  });
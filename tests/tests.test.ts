import supertest from "supertest";
import app from '../src/app'
import { prisma } from "../src/database";
import _userFactory from "./factories/userFactory";
import _testFactory from './factories/testFactory';

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY`;
    await prisma.$executeRaw`TRUNCATE TABLE "tests" RESTART IDENTITY`;
});

describe('Testa post /sign-up', () => {
    it('Deve retornar 201 ao cadastrar um usuario com body certo', async () => {
        const user = await _userFactory({});
        const result = await supertest(app).post('/sign-up').send(user);

        const createdUser = await prisma.users.findUnique({
            where: {email: user.email}
        });
        expect(result.status).toBe(201);
        expect(createdUser).not.toBeNull();
    });
    it('Deve retornar 409 ao tentar cadastrar um usuario que ja exista', async () => {
        const user = await _userFactory({persist: true})
        const result = await supertest(app).post('/sign-up').send({...user, confirmPassword: user.password})
        expect(result.status).toBe(409)
    })
    it('Deve retornar 422 ao tentar cadastrar com body errado', async () => {
        const user = await _userFactory({});
        delete user.email;
        const result = await supertest(app).post('/sign-up').send(user);
        expect(result.status).toBe(422);
    })
})

describe('Testa POST /sign-in', () => {
    it('Deve retornar 200 caso haja login, e retornar um token', async () => {
        const user = await _userFactory({persist: true})
        const result = await supertest(app).post('/sign-in').send(user);
        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Object);
    });
    it('Deve retornar 401 caso envie um body com credenciais erradas', async () => {
        const result = await supertest(app).post('/sign-in').send({email: "hfgkohgfkoh@gmail.com", password: "hdheyhfgdhhf"});
        expect(result.status).toBe(401);
    })
})

describe('Testa post /tests', () => {
    it('Deve retornar 201 ao criar um teste corretamente', async () => {
        const test = await _testFactory({})
        const user = await _userFactory({persist: true})
        const login = await supertest(app).post('/sign-in').send(user);
        const token = login.body.token;
        const result = await supertest(app).post('/tests').set({Authorization: `Bearer ${token}`}).send(test);
        expect(result.status).toBe(201);
    })
    it('Deve retornar 400 ao criar um teste sem token', async () => {
        const test = await _testFactory({})
        const user = await _userFactory({persist: true})

        const login = await supertest(app).post('/sign-in').send(user);
        const result = await supertest(app).post('/tests').send(test);
        expect(result.status).toBe(400);
    })
    it('Deve retornar 422 ao tentar criar com body errado', async () => {
        const test = await _testFactory({})
        const user = await _userFactory({persist: true})

        delete test.teacherDisciplineId
        const login = await supertest(app).post('/sign-in').send(user);
        const token = login.body.token;
        const result = await supertest(app).post('/tests').set({Authorization: `Bearer ${token}`}).send(test);
        expect(result.status).toBe(422);
    })
})

describe('Testa get /tests-by-terms', () => {
    it('Deve retornar 200 e receber o body em formato de objeto', async () => {
        const user = await _userFactory({persist: true})
        const login = await supertest(app).post('/sign-in').send(user);
        const token = login.body.token;
        const result = await supertest(app).get('/tests-by-terms').set({Authorization: `Bearer ${token}`}).send();
        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Object);
    })
    it('Deve retornar 400 caso nao envie um token via headers', async () => {
        const user = await _userFactory({persist: true})

        const login = await supertest(app).post('/sign-in').send(user);
        const result = await supertest(app).get('/tests-by-teachers').send();
        expect(result.status).toBe(400);
        expect(result.body).toBeInstanceOf(Object);
    })
})
describe('Testa get /tests-by-teachers', () => {
    it('Deve retornar 200 e receber o body em formato de objeto', async () => {
        const user = await _userFactory({persist: true})

        const login = await supertest(app).post('/sign-in').send(user);
        const token = login.body.token;
        const result = await supertest(app).get('/tests-by-teachers').set({Authorization: `Bearer ${token}`}).send();
        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Object);
    })
    it('Deve retornar 400 caso nao envie um token via headers', async () => {
        const user = _userFactory({persist: true})

        const login = await supertest(app).post('/sign-in').send(user);
        const result = await supertest(app).get('/tests-by-teachers').send();
        expect(result.status).toBe(400);
        expect(result.body).toBeInstanceOf(Object);
    })
})
afterAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY`;
    await prisma.$executeRaw`TRUNCATE TABLE "tests" RESTART IDENTITY`;
    await prisma.$disconnect();
    
  });
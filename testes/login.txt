// testes\login.test.js
const app = require('../src/app');
const request = require('supertest'); // para simular requisições HTTP


test('deve retornar 401 se o email for inválido', () => {
    async () => {
        const res = await request(app)
            .post('/gatos/login')
            .send({ email: 'invalid@example.com', senha: '123456' });

        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('Email inválido');
    }
})

test('deve retornar 401 se a senha estiver incorreta', () => {
    async () => {
        const res = await request(app)
            .post('/gatos/login')
            .send({ email: 'gato@example.com', senha: 'wrongpassword' });

        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('senha inválida');
    }
});

test('deve retornar 200 e um token se o login for bem-sucedido',() => {
    async () =>{
    const res = await request(app)
        .post('/gatos/login')
        .send({ email: 'gato@example.com', senha: '123456' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Login realizado com sucesso');
    expect(res.body).toHaveProperty('token');
}
})
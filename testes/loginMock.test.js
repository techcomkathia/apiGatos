const request = require('supertest');
const app = require('../src/app');
const Gato = require('../src/models/GatoModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mock do modelo Gato
jest.mock('../src/models/GatoModel');

beforeAll(async () => {
  server = app.listen(6000, () => console.log('Servidor iniciado para testes. Disponível na porta 6000'));

  // Obter o token de autenticação para testar rotas protegidas
  const response = await request(app)
    .post('/gatos/login')
    .send({ email: 'gatoteste@email.com', senha: '1234' });

  authToken = response.body.token;
});

// Fechar o servidor
afterAll( async() => {
   await server.close();
  });

describe('Testes de Login', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // Limpa os mocks antes de cada teste
  });

  test('deve retornar 401 se o email for inválido', async () => {
    // Mock da resposta do banco de dados para email inválido
    Gato.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post('/gatos/login')
      .send({ email: 'invalid@example.com', senha: '123456' });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Email inválido');
  });

  test('deve retornar 401 se a senha estiver incorreta', async () => {
    // Mock da resposta do banco de dados com senha incorreta
    const gato = {
      dataValues: {
        senha: await bcrypt.hash('correctpassword', 10), // Senha correta no banco de dados
      }
    };
    Gato.findOne.mockResolvedValue(gato);

    const res = await request(app)
      .post('/gatos/login')
      .send({ email: 'gato@example.com', senha: 'wrongpassword' });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('senha inválida');
  });

  test('deve retornar 200 e um token se o login for bem-sucedido', async () => {
    // Mock da resposta do banco de dados com senha correta
    const senhaCriptografada = await bcrypt.hash('123456', 10); // Senha criptografada
    const gato = {
      dataValues: {
        id: 1,
        email: 'gato@example.com',
        senha: senhaCriptografada
      }
    };
    Gato.findOne.mockResolvedValue(gato);

    //criando um token mockado 
    // Mock do método jwt.sign
    //jest.spyOn(objeto, nomeDoMetodo)
    /*mockImplementation é uma implementação personalizada para uma função ou método espiado.*/
    jest.spyOn(jwt, 'sign').mockImplementation((payload, secret, options) => 'fake-token');
    


    const res = await request(app)
      .post('/gatos/login')
      .send({ email: 'gato@example.com', senha: '123456' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Login realizado com sucesso');
    expect(res.body).toHaveProperty('token', 'fake-token');
  });
});

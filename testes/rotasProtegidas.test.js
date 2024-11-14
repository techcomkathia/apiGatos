const request = require('supertest');
const app = require('../src/app');

let server;
let authToken;

// Inicializar o servidor antes de todos os testes
beforeAll(async () => {
  server = app.listen(6000, () => console.log('Servidor iniciado para testes. Disponível na porta 6000'));

  // Obter o token de autenticação para testar rotas protegidas
  const response = await request(app)
    .post('/gatos/login')
    .send({ email: 'gatoteste@email.com', senha: '1234' });

  authToken = response.body.token;
});

// Fechar o servidor
afterAll(() => {
    server.close();
  });
  
describe('Testes de Rota de Boas-vindas', () => {
    test('deve retornar a mensagem de boas-vindas', async () => {
      const response = await request(app).get('/');
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Bem-vindo a api do Cleitinho',
        version: '1.0.0',
        autor: 'Cleitinho'
      });
    });
});
  
  describe('Testes de Autenticação e Rotas Protegidas', () => {
    test('deve retornar 401 se o email for inválido', async () => {
      const response = await request(app)
        .post('/gatos/login')
        .send({ email: 'emailErrado@gato.com', senha: '1234' });
  
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Email inválido');
    });
  
    test('deve retornar 401 se a senha estiver incorreta', async () => {
      const response = await request(app)
        .post('/gatos/login')
        .send({ email: 'gatoteste@email.com', senha: 'senhaErrada' });
  
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('senha inválida');
    });
  
    test('deve retornar 200 e um token se o login for bem-sucedido', async () => {
      const response = await request(app)
        .post('/gatos/login')
        .send({ email: 'gatoteste@email.com', senha: '1234' });
  
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Login realizado com sucesso');
      expect(response.body).toHaveProperty('token');
      authToken = response.body.token; // Atualiza o token para uso em testes subsequentes
    });
  
    test('deve acessar uma rota protegida com um token válido', async () => {
      const response = await request(app)
        .get('/gatos')
        .set('Authorization', `Bearer ${authToken}`);
  
      expect(response.status).toBe(200);
      // Ajuste conforme a estrutura da resposta esperada
      expect(response.body).toHaveProperty('dados');
    });
  
    test('deve retornar 401 se o token for inválido', async () => {
      const response = await request(app)
        .get('/gatos')
        .set('Authorization', 'Bearer invalidToken');
  
      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Invalid token');
    });
  });

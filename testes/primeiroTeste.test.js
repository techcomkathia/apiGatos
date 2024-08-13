const soma = require('../soma');    

test('Soma de 1 + 1 deve retornar 2', () => {
    expect(soma(1, 1)).toBe(2);
})
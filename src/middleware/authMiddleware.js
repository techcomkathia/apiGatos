// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
// resgatar o token da requisição
const token = req.header('Authorization');
// se não tiver token, retornar erro
if (!token) return res.status(401).json({ error: 'Acesso negado' });
// se tiver token, verificar se é valido
try {
 const tokenDecodado = jwt.verify(token, 'your-secret-key');
 req.userId = tokenDecodado.userId;
 // passar para o proximo middleware
 next();
 } catch (error) {
 res.status(401).json({ error: 'Invalid token' });
 }
 };

module.exports = verificarToken;
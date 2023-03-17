var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var users = {
  'adm': 'Password1',
  'cvmota': '123'
}

/**
 * Criar a rota "/check-user" utilizando o método POST para validar as credenciais inseridas no formulário de login.
 * Sempre que a rota "/users/check-user" é invocada, valida se o utilizador existe e se a password inserida
 * no formulário corresponde ao registro do utilizador.
 */
router.post('/check-user', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  pw = users[username];
  if (pw && pw === password) {
    res.json({message: 'Autenticação válida!'});
  } else {
    res.status(401).json({message: 'Utilizador ou password inválidos!'});
  }
});

module.exports = router;

var express = require('express');
var router = express.Router();
var UserController = require('../controller/users');


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/**
 * Retorna true se o utilizador existe e se a password é valida
 */
async function isValidUser(username, password) {

    try {
        const user = await UserController.getByUsername(username);
        if (user && user.active === 1 && user.password === password) {
            console.log("User valid!");
            return true;
        }
        console.log("User invalid!");
        return false;

    } catch (err) {
        console.error("Connection error", err);
        return false;
    }
}


/**
 * Criar a rota "/check-user" utilizando o método POST para validar as credenciais inseridas no formulário de login.
 * Sempre que a rota "/users/check-user" é invocada, valida se o utilizador existe e se a password inserida
 * no formulário corresponde ao registro do utilizador.
 */
router.post('/check-user', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;


    isValidUser(username, password).then(isValid => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Allow-Credentials', true);

        if (isValid) {
            res.json({message: 'Autenticação válida!'});
        } else {
            res.status(401).json({message: 'Utilizador ou password inválidos!'});
        }
    }).catch(error => {
        res.status(500).json({message: 'Ocorreu um erro na validação do utilizador!'});
        console.log(error.message);
    });
});

// Rota para criar uma nova conta
router.post('/create-account', async (req, res) => {

    const {username, first_name, last_name, email, password} = req.body;

    let existingUser = await UserController.getByUsername(username);
    if (existingUser) {
        return res.status(409).json({message: 'O utilizador "' + username + '" já existe!'});
    }
    existingUser = await UserController.getUserByEmail(email);
    if (existingUser) {
        return res.status(409).json({message: 'O e-mail já está em uso.'});
    }

    // Criar uma nova conta com os dados fornecidos
    let resp = await UserController.newUser(username, password, first_name, last_name, email)
    if (resp.success) {
        res.status(201).json({message: 'Conta criada com sucesso.'});
    } else {
        res.status(500).json({message: 'Erro a criar a nova conta. Motivo:' + resp.response});
    }

});

module.exports = router;

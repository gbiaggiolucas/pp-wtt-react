const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function storeUser(request, response) {

    const params = Array(
        request.body.email,
        request.body.nome,
        request.body.senha
    );

    const query = "INSERT INTO usuario(email, nome, senha) VALUES(?, ?, ?)";

    connection.query(query, params, (err, results) => {
        if(results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso!",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Ops, sem sucesso :(",
                    data: err
                })
        }
    })
}

async function login(request, response) {
    const email = Array(request.body.email);

    const query = "SELECT email, senha FROM usuario WHERE email = ?";

    connection.query(query, email, (err, results) => {
        console.log("erro", err)
        if(results.length > 0) {
            const senha = request.body.senha;
            const senhaQuery = results[0].senha;

            if(senha === senhaQuery) {
                response
                .status(200)
                .json({
                    success: true, 
                    message: "Sucesso!",
                    data: results
                })
            } else {
                response
                .status(400)
                .json({
                    success: false,
                    message: "Senha incorreta",
                })
            }
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Email não cadastrado ou incorreto",
                    data: err
                })
        }
    })
}

module.exports = {
    storeUser,
    login
}
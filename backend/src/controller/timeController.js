const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function sendTime(request, response) {
    const { nomeRedeSocial, tempoEmMilissegundos, usuario_id } = request.body;

    if (!nomeRedeSocial || !tempoEmMilissegundos || !usuario_id) {
        return response.status(400).json({
            success: false,
            message: "Todos os campos (nomeRedeSocial, tempoEmMilissegundos, usuario_id) são obrigatórios"
        });
    }

    const query = "INSERT INTO tempo_redes_sociais (nomeRedeSocial, tempoEmMilissegundos, usuario_id) VALUES (?, ?, ?)";
    const params = [nomeRedeSocial, tempoEmMilissegundos, usuario_id];

    connection.query(query, params, (err, results) => {
        if (err) {
            return response.status(400).json({
                success: false,
                message: "Erro ao inserir os dados",
                data: err
            });
        }

        response.status(200).json({
            success: true,
            message: "Dados enviados com sucesso!",
            data: results
        });
    });
}


// Controller para buscar dados de tempo nas redes sociais por user_id
const getTime = async (req, res) => {
    const email = req.params.email;  // Aqui o email será obtido da URL

    if (!email) {
        return res.status(400).json({ message: "Email não fornecido." });
    }

    try {
        const query = "SELECT * FROM tempo_redes_sociais WHERE usuario_id = (SELECT id FROM usuario WHERE email = ?)";
        const [dados] = await db.execute(query, [email]);

        if (dados.length > 0) {
            res.status(200).json({ dados });
        } else {
            res.status(404).json({ message: "Nenhum dado encontrado para este usuário." });
        }
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        res.status(500).json({ message: "Erro interno ao buscar os dados." });
    }
};

module.exports = {
    sendTime,
    getTime
};
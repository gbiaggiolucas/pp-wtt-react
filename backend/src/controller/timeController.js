const connection = require('../config/db'); // Usando a conexão do MySQL
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
const getTime = (req, res) => {
    connection.query("SELECT * FROM tempo_redes_sociais WHERE usuario_id = ?", [1], (err, result) => {
        if (err) {
            console.error("Erro ao buscar dados:", err);
            return res.status(500).json({ success: false, message: "Erro no servidor" });
        }

        if (result.length > 0) {
            return res.status(200).json({ success: true, dados: result });
        } else {
            return res.status(404).json({ success: false, message: "Nenhum dado encontrado" });
        }
    });
};

module.exports = {
    sendTime,
    getTime
};

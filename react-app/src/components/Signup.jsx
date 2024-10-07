import React, { useState } from "react";
import logo from "../img/WTT.png";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api"

const Signup = () => {
    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmSenha, setConfirmSenha] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            email,
            nome,
            senha
        }

        if (senha === confirmSenha) {
            const response = await api.post('/create/account', data);

            if (response.data.success) {
			    navigate("/signin");
            } else {
                alert("Não foi possível criar a conta");
            }
        } else {
            alert("As senhas não são iguais");
        }
    }

    return (
    <>
        <div className="logo-container">
            <img src={logo} height="150vh" alt="Logo" />
        </div>
        <form className="signup-container" onSubmit={ handleSubmit }>
            <h4>Cadastre-se para continuar</h4>
            <label htmlFor="email">E-mail:</label>
            <input type="email" name="email" id="email" placeholder="Digite seu email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="nome">Nome de usuário:</label>
            <input type="text" name="nome" id="nome" placeholder="Digite seu nome" required value={nome} onChange={(e) => setNome(e.target.value)} />
            <label htmlFor="senha">Senha:</label>
            <input type="password" name="senha" id="senha" placeholder="Digite sua senha" required value={senha} onChange={(e) => setSenha(e.target.value)} />
            <label htmlFor="confirmarsenha">Confirmar senha:</label>
            <input type="password" name="confirmarsenha" id="confirmarsenha" placeholder="Confirme sua senha" required value={confirmSenha} onChange={(e) => setConfirmSenha(e.target.value)} /><br />
            <button className="btn-confirmar" id="confirm">Confirmar</button>
        </form>
    </>
    )
}

export default Signup;
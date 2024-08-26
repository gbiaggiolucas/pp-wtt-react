import React, { useState } from "react";
import logo from "../img/WTT.png";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api"

const Signin = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            email,
            senha
        };

        const response = await api.post('/auth/login', data);
        
        if (response.data.success) {
			navigate("/Main");
        } else {
            alert("Não foi possível entrar na conta");
        }
    };

    return (
        <>
            <div className="logo-container">
                <img src={logo} height="150vh" alt="logo" />
            </div>
            <form className="signup-container" onSubmit = { handleSubmit }>
                <h4>Cadastre-se para continuar</h4><br />
                <label htmlFor="email">E-mail:</label><br />
                <input type="email" name="email" id="email" placeholder="Digite seu email" required value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                <label htmlFor="senha">Senha:</label><br />
                <input type="password" name="senha" id="senha" placeholder="Digite sua senha" required value={senha} onChange={(e) => setSenha(e.target.value)} /><br />
                <button className="btn-confirmar" id="login">Confirmar</button>
            </form>
        </>
    )
}

export default Signin;
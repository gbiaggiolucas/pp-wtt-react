import React, { useState } from "react";
import logo from "../img/WTT.png";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = { email, senha };
    
        try {
            const response = await api.post('/auth/login', data);
    
            if (response.data.success) {
                // Armazena o email no localStorage após o login
                localStorage.setItem("email", email);  // Use o valor da variável 'email' aqui
                console.log("Email armazenado:", email);  // Verifique no console se o email foi armazenado corretamente
    
                // Redireciona para /faketime
                navigate("/faketime");
            } else {
                alert("Não foi possível entrar na conta");
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Erro ao tentar login");
        }
    };    

    return (
        <>
            <div className="logo-container">
                <img src={logo} height="150vh" alt="logo" />
            </div>
            <form className="signup-container" onSubmit={handleSubmit}>
                <h4>Cadastre-se para continuar</h4>
                <label htmlFor="email">E-mail:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Digite seu email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="senha">Senha:</label>
                <input
                    type="password"
                    name="senha"
                    id="senha"
                    placeholder="Digite sua senha"
                    required
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button className="btn-confirmar" id="login">
                    Confirmar
                </button>
            </form>
        </>
    );
};

export default Signin;

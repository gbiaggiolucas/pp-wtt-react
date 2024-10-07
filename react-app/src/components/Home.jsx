import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/WTT.png";


const Home = () => {

    return (
        <>
            <div className="welcome-container">
                <h2>Bem-vindo ao</h2>
                <img src={logo} height="100vh" alt="logo"></img>
            </div>
            <div className="btn-container">
                <Link to="/signin"><button className="btn-entrar" id="signin">Entrar</button></Link>
                <Link to="/signup"><button className="btn-criar-conta" id="signup">Criar Conta</button></Link>
            </div>
        </>
    )
}

export default Home;
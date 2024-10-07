import React, { useState, useContext, useEffect } from "react";
import logo from "../img/WTT.png";
import { Link } from "react-router-dom";
import { ThemeContext } from './context/ThemeContext';

const Config = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isNotify, setIsNotify] = useState(() => {
        return localStorage.getItem('isNotify') === "true";
    });

    const toggleOffcanvas = () => {
        setIsOpen(!isOpen);
    };

    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    const handleNotification = async () => {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            setIsNotify(true);
        } else {
            setIsNotify(false);
            alert("Permissão para notificações foi negada.");
        }
    };

    useEffect(() => {
        // Salva o estado de notificação no localStorage
        localStorage.setItem('isNotify', isNotify);
        
        // Só envia a notificação se for a primeira vez que as notificações foram ativadas
        if (isNotify && Notification.permission === "granted" && !localStorage.getItem('notificationShown')) {
            new Notification("Notificações ativadas!", {
                body: "Você ativou as notificações do app.",
                icon: logo
            });
            localStorage.setItem('notificationShown', 'true');
        }
    }, [isNotify]);

    useEffect(() => {
        // Verifica a permissão de notificação sempre que o componente é montado
        if (Notification.permission !== "granted") {
            setIsNotify(false);
            localStorage.removeItem('notificationShown');
        }
    }, []);

    return (
        <>
            <nav className="navbar">
                <div className="container-fluid">
                    <img src={logo} alt="Wtt icon" className="wtt" />
                    <h2>Bem Vindo!</h2>
                    <button className="navbar-toggler" type="button" onClick={toggleOffcanvas}>
                        <span className="navbar-toggler-icon"></span>
                        <span className="navbar-toggler-icon"></span>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`offcanvas ${isOpen ? 'open' : ''}`} id="offcanvasNavbar">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title">Navegação</h5>
                            <button type="button" className="btn-close" onClick={toggleOffcanvas}>x</button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/main" className="link">Análise</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/metas" className="link">Metas</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/config" className="link active">Configurações</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="container signup-container mt-5">
                <p>
                    Trocará a cor principal por preto, 
                    favorecendo pessoas que sentem cansaço 
                    visual ao visualizar cores muito luminosas 
                    por muito tempo.
                </p>
                <button onClick={toggleTheme} className="btn-entrar config">
                    {isDarkMode ? "Desativar Dark Mode" : "Ativar Dark Mode"}
                </button>
                <p>
                    Notificações serão enviadas sobre o progresso 
                    de suas metas ou caso fique inativo por muito tempo.
                </p>
                {isNotify ? <p style={{fontWeight: "bold",}}>Notificações Ativadas</p> : <button onClick={handleNotification} className='btn-entrar config'>Ativar Notificações</button>}
                <br />
                <Link to="/"><button className="btn btn-danger" id="exit">Sair</button></Link>
                
            </main>
        </>
    );
};

export default Config;

import React, { useState, useEffect } from "react";
import logo from "../img/WTT.png";
import { Link } from "react-router-dom";

const Metas = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [timeLeftWork, setTimeLeftWork] = useState(6 * 60 * 60);
    const [timeLeftSchool, setTimeLeftSchool] = useState(2 * 60 * 60);
    const [timeLeftDaily, setTimeLeftDaily] = useState(3 * 60 * 60);

    useEffect(() => {
        // Carregar estados dos desafios do localStorage
        const savedActiveChallenge = localStorage.getItem('activeChallenge');
        const savedTimeLeftWork = localStorage.getItem('timeLeftWork');
        const savedTimeLeftSchool = localStorage.getItem('timeLeftSchool');
        const savedTimeLeftDaily = localStorage.getItem('timeLeftDaily');

        if (savedActiveChallenge) setActiveChallenge(JSON.parse(savedActiveChallenge));

        if (savedTimeLeftWork) setTimeLeftWork(JSON.parse(savedTimeLeftWork));
        if (savedTimeLeftSchool) setTimeLeftSchool(JSON.parse(savedTimeLeftSchool));
        if (savedTimeLeftDaily) setTimeLeftDaily(JSON.parse(savedTimeLeftDaily));
    }, []);

    useEffect(() => {
        let interval = null;

        if (activeChallenge === 'work') {
            interval = setInterval(() => {
                setTimeLeftWork((prev) => {
                    const newTimeLeft = prev - 1;
                    localStorage.setItem('timeLeftWork', JSON.stringify(newTimeLeft));
                    if (newTimeLeft <= 0) {
                        clearInterval(interval);
                        setActiveChallenge(null);
                        localStorage.removeItem('activeChallenge');
                        localStorage.removeItem('timeLeftWork');
                    }
                    return newTimeLeft;
                });
            }, 1000);
        }

        if (activeChallenge === 'school') {
            interval = setInterval(() => {
                setTimeLeftSchool((prev) => {
                    const newTimeLeft = prev - 1;
                    localStorage.setItem('timeLeftSchool', JSON.stringify(newTimeLeft));
                    if (newTimeLeft <= 0) {
                        clearInterval(interval);
                        setActiveChallenge(null);
                        localStorage.removeItem('activeChallenge');
                        localStorage.removeItem('timeLeftSchool');
                    }
                    return newTimeLeft;
                });
            }, 1000);
        }

        if (activeChallenge === 'daily') {
            interval = setInterval(() => {
                setTimeLeftDaily((prev) => {
                    const newTimeLeft = prev - 1;
                    localStorage.setItem('timeLeftDaily', JSON.stringify(newTimeLeft));
                    if (newTimeLeft <= 0) {
                        clearInterval(interval);
                        setActiveChallenge(null);
                        localStorage.removeItem('activeChallenge');
                        localStorage.removeItem('timeLeftDaily');
                    }
                    return newTimeLeft;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [activeChallenge]);

    const formatTimeLeft = (timeLeft) => {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    const startChallenge = (type) => {
        let initialTime;
        if (type === 'work') {
            initialTime = 6 * 60 * 60;
        } else if (type === 'school') {
            initialTime = 2 * 60 * 60;
        } else if (type === 'daily') {
            initialTime = 3 * 60 * 60;
        }

        setActiveChallenge(type);
        localStorage.setItem('activeChallenge', JSON.stringify(type));

        if (type === 'work') {
            setTimeLeftWork(initialTime);
            localStorage.setItem('timeLeftWork', JSON.stringify(initialTime));
        } else if (type === 'school') {
            setTimeLeftSchool(initialTime);
            localStorage.setItem('timeLeftSchool', JSON.stringify(initialTime));
        } else if (type === 'daily') {
            setTimeLeftDaily(initialTime);
            localStorage.setItem('timeLeftDaily', JSON.stringify(initialTime));
        }
    };

    const cancelChallenge = () => {
        setActiveChallenge(null);
        localStorage.removeItem('activeChallenge');
        if (activeChallenge === 'work') localStorage.removeItem('timeLeftWork');
        if (activeChallenge === 'school') localStorage.removeItem('timeLeftSchool');
        if (activeChallenge === 'daily') localStorage.removeItem('timeLeftDaily');
    };

    const toggleOffcanvas = () => {
        setIsOpen(!isOpen);
    };

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
                                    <Link to="/metas" className="link active">Metas</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/config" className="link">Configurações</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="container signup-container mt-5">
                <h2>Desafios</h2>
                <div className="desafio worktime">
                    <h3>Hora de trabalhar!</h3>
                    <p>Não utilize redes sociais nas próximas 6 horas</p>
                    {activeChallenge === 'work' ? (
                        <>
                            <p>Tempo restante: {formatTimeLeft(timeLeftWork)}</p>
                            <button onClick={cancelChallenge} className="btn-entrar config">Cancelar Desafio</button>
                        </>
                    ) : (
                        <button onClick={() => startChallenge('work')} className="btn-entrar config">Iniciar Desafio</button>
                    )}
                </div>
                <div className="desafio school">
                    <h3>Estudar em casa</h3>
                    <p>Não utilize redes sociais nas próximas 2 horas</p>
                    {activeChallenge === 'school' ? (
                        <>
                            <p>Tempo restante: {formatTimeLeft(timeLeftSchool)}</p>
                            <button onClick={cancelChallenge} className="btn-entrar config">Cancelar Desafio</button>
                        </>
                    ) : (
                        <button onClick={() => startChallenge('school')} className="btn-entrar config">Iniciar Desafio</button>
                    )}
                </div>
                <div className="desafio dailyquest">
                    <h3>Desafio diário</h3>
                    <p>Não utilize redes sociais por 3 horas</p>
                    {activeChallenge === 'daily' ? (
                        <>
                            <p>Tempo restante: {formatTimeLeft(timeLeftDaily)}</p>
                            <button onClick={cancelChallenge} className="btn-entrar config">Cancelar Desafio</button>
                        </>
                    ) : (
                        <button onClick={() => startChallenge('daily')} className="btn-entrar config">Iniciar Desafio</button>
                    )}
                </div>
            </main>
        </>
    );
};

export default Metas;

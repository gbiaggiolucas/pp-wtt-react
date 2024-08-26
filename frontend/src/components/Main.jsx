import React, { useState } from "react";
import logo from "../img/WTT.png";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Main = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOffcanvas = () => {
        setIsOpen(!isOpen);
    };

    const data = {
        labels: ['Facebook', 'X', 'Instagram', 'WhatsApp', 'TikTok'],
        datasets: [
            {
                label: 'Tempo de uso (minutos)',
                data: [120, 90, 180, 150, 240], // Tempo em minutos
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        const hours = Math.floor(value / 60);
                        const minutes = value % 60;
                        return `${hours}h ${minutes}m`;
                    }
                }
            },
        },
    };

    // Calcula o total de minutos
    const totalMinutes = data.datasets[0].data.reduce((acc, val) => acc + val, 0);

    // Converte o total de minutos para horas e minutos
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

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
                                    <Link to="/main" className="link active">
                                        Análise
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/metas" className="link">
                                        Metas
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/config" className="link">
                                        Configurações
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <main>
                <div className="container">
                    <h3>Seu Tempo nas Redes Sociais</h3>
                    <Bar data={data} options={options} />
                    <p className="total-time">
                        Total de tempo nas redes sociais: <br /> {totalHours} horas e {remainingMinutes} minutos.
                    </p>
                </div>
            </main>
        </>
    );
};

export default Main;
import React, { useState, useEffect } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { api } from "../services/api";
import { Link } from "react-router-dom";
import logo from '../img/WTT.png';  // Caminho correto para o arquivo da logo

ChartJS.register(ArcElement, Tooltip, Legend);

const Main = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [socialData, setSocialData] = useState([]); // Estado para armazenar os dados do backend

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/time/get`);  // Busca dados pelo `usuario_id = 1`
                if (response.data && response.data.dados) {
                    setSocialData(response.data.dados);  // Armazena os dados na resposta
                } else {
                    console.error("Erro ao carregar dados: Nenhum dado encontrado");
                }
            } catch (error) {
                console.error("Erro ao buscar dados:", error.response ? error.response.data : error.message);
            }
        };
    
        fetchData();
    }, []);    

    const labels = socialData.map(item => item.nomeRedeSocial);
    const dataInMinutes = socialData.map(item => item.tempoEmMilissegundos / (60 * 1000)); // Convertendo de milissegundos para minutos

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Tempo de uso (minutos)',
                data: dataInMinutes,
                backgroundColor: [
                    'rgba(24, 119, 242, 0.8)',
                    'rgba(219, 129, 217, 0.8)',
                    'rgba(219, 88, 83, 0.8)',
                    'rgba(37, 211, 102, 0.8)',
                    'rgba(0, 0, 0, 0.8)',
                ],
                borderColor: "var(--cor-do-texto)",
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: false,
            tooltip: {
                enabled: true,
            },
        },
    };

    // Calcula o total de minutos
    const totalMinutes = dataInMinutes.reduce((acc, val) => acc + val, 0);
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

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
                                    <Link to="/main" className="link active">Análise</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/metas" className="link">Metas</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/config" className="link">Configurações</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <main>
                <div className="container">
                    <h3>Seu Tempo nas Redes Sociais</h3>
                    <Pie data={data} options={options} />
                    <p className="total-time">
                        Total de tempo nas redes sociais: <br /> {totalHours} horas e {remainingMinutes} minutos.
                    </p>
                </div>
            </main> 
        </>
    );
};

export default Main;
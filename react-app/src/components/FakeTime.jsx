import React, { useState } from "react";
import logo from "../img/WTT.png";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const FakeTime = () => {
  const [statusMessage, setStatusMessage] = useState('');
  const navigate = useNavigate();

  const sendFakeData = async () => {
    const dataInMinutes = [20, 60, 60, 45, 40];
    const labels = ["Facebook", "Instagram", "Youtube", "WhatsApp", "TikTok"];
    const dataInMilliseconds = dataInMinutes.map(minutes => minutes * 60 * 1000);
    const fakeData = dataInMilliseconds.map((time, index) => ({
      nomeRedeSocial: labels[index],
      tempoEmMilissegundos: time,
      usuario_id: 1,
    }));

    try {
      for (let data of fakeData) {
        const response = await api.post('/time/send', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.data || !response.data.success) {
          throw new Error(response.data?.message || "Erro ao enviar dados");
        }
      }
      setStatusMessage("Todos os dados fictícios foram enviados com sucesso!");
      navigate("/main");
    } catch (error) {
      console.error("Erro ao enviar dados fictícios:", error);
      setStatusMessage("Erro ao enviar dados fictícios: " + error.message);
    }
  };

  return (
    <>
      <div className="logo-container">
        <img src={logo} height="150vh" alt="logo" />
      </div>
      <div className="signup-container">
        <h4>Envie dados fictícios para o servidor</h4><br />
        <button className="btn-confirmar" onClick={sendFakeData}>
          Enviar Dados Fictícios
        </button>
        <br />
        <p>{statusMessage}</p>
      </div>
    </>
  );
};

export default FakeTime;

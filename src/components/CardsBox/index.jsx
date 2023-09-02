import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import CardZonaDeRisco from "../../components/CardZonaDeRisco";
import CardPontoDeApoio from "../../components/CardPontoDeApoio";
import CardSirene from "../../components/CardSirene";
import "./style.css";
import { useFiltro } from "../../context/FiltroContext";

function CardsBox() {
  const [zonasDeRisco, setZonasDeRisco] = useState([]);
  const [pontosDeApoio, setPontosDeApoio] = useState([]);
  const [sirenes, setSirenes] = useState([]);
  const { filtro, setFiltro } = useFiltro();

  useEffect(() => {
    getData();
  }, [filtro]);

  function getData() {
    try {
      api.get("/sirenes").then((response) => {
        setSirenes(response.data);
      });
    } catch {
      console.log("Erro ao consumir a rota das sirenes");
    }

    try {
      api.get("/pontosdeapoio").then((response) => {
        setPontosDeApoio(response.data);
      });
    } catch {
      console.log("Erro ao consumir os pontos de apoio");
    }

    try {
      api.get("/zonasderisco").then((response) => {
        setZonasDeRisco(response.data);
      });
    } catch {
      console.log("Erro ao consumir as areas de risco");
    }
  }

  return (
    <>
      <div id="cardsBoxContainer">
        <div id="cardsContainer">
          {zonasDeRisco.map((zonaDeRisco) => {
            if (filtro.risco == true) {
              return (
                <CardZonaDeRisco
                  key={zonaDeRisco.id}
                  zDR={zonaDeRisco}
                  zDiD={zonaDeRisco.id}
                />
              );
            }
          })}
          {pontosDeApoio.map((pontoDeApoio) => {
            if (filtro.ponto == true) {
              return (
                <CardPontoDeApoio
                  key={pontoDeApoio.id}
                  pDA={pontoDeApoio}
                  pAiD={pontoDeApoio.id}
                />
              );
            }
          })}
          {sirenes.map((sirene) => {
            if (filtro.sirene == true) {
              return (
                <CardSirene key={sirene.id} sI={sirene} sIiD={sirene.id} />
              );
            }
          })}
        </div>
      </div>
    </>
  );
}

export default CardsBox;

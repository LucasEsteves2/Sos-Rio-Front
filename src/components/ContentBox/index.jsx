import React, { useEffect, useState } from "react";
import Lens from "../../assets/img/lens.png";
import CardZonaDeRisco from "../../components/CardZonaDeRisco";
import ContentNavbar from "../../components/ContentNavbar";
import CardsBox from "../../components/CardsBox";
import CardZonaDeRiscoFull from "../../components/CardZonaDeRiscoFull";
import CardPontoDeApoioFull from "../../components/CardPontoDeApoioFull";
import CardSireneFull from "../../components/CardSireneFull";
import CardZonaDeRiscoPopResearch from "../../components/CardZonaDeRiscoPopResearch";
import CardPontoDeApoioPopResearch from "../../components/CardPontoDeApoioPopResearch";
import CardSirenePopResearch from "../../components/CardSirenePopResearch";
import CardSirenePopEvaluation from "../../components/CardSirenePopEvaluation";
import CardPontoDeApoioPopEvaluation from "../../components/CardPontoDeApoioPopEvaluation";
import CardZonaDeRiscoPopEvaluation from "../../components/CardZonaDeRiscoPopEvaluation";
import "./style.css";
import { useLocation, Routes, Route } from "react-router-dom";
import { useClickObj } from "../../context/ClickObj";

function ContentBox() {
  const [rotaAtual, setRotaAtual] = useState(useLocation());
  const { obj, setObj } = useClickObj();

  useEffect(() => {
    rota();
    console.log(obj);
  }, [obj]);

  function rota() {
    if (obj.tipo == "sirene") {
      return <CardSireneFull />;
    }
    if (obj.tipo == "apoio") {
      return <CardPontoDeApoioFull />;
    }
    if (obj.tipo == "risco") {
      return <CardZonaDeRiscoFull />;
    }
    if(obj.tipo == "riscoPesquisa") {
      return <CardZonaDeRiscoPopResearch />
    } 
    if(obj.tipo == "apoioPesquisa") {
      return <CardPontoDeApoioPopResearch />
    }
    if(obj.tipo == "sirenePesquisa") {
      return <CardSirenePopResearch />
    }
    if(obj.tipo == "sireneAvaliacao") {
      return <CardSirenePopEvaluation />
    }
    if(obj.tipo == "apoioAvaliacao") {
      return <CardPontoDeApoioPopEvaluation />
    }
    if(obj.tipo == "riscoAvaliacao") {
      return <CardZonaDeRiscoPopEvaluation />
    } else {
    }
    {
      return (
        <>
          <div id="contentNavbarContainer">
            <ContentNavbar />
          </div>
          <div id="cardsBoxContainer">
            <CardsBox />
          </div>
        </>
      );
    }
  }
  return (
    <>
      <div id="contentBox">
        {rota()}
      </div>
    </>
  );
}

export default ContentBox;

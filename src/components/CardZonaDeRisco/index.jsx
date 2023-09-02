import React, { useEffect, useState } from "react";
import { useClickObj } from "../../context/ClickObj";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../services/api";
import AverageGraph from "../AverageGraph";
import IconZdR from "../../assets/icons/risco.png";
import "./style.css";
import { useUsuario } from "../../context/UsuarioContext";
import Pdf from "../../assets/Parâmetros Defesa Civil.pdf";

function CardZonaDeRisco({ zDR, zDiD }) {
  const { obj, setObj } = useClickObj();
  const [zonaDeRisco, setZonaDeRisco] = useState({});

  const [
    avaliacoesDefesaCivilZonasDeRisco,
    setAvaliacoesDefesaCivilZonasDeRisco,
  ] = useState([]);
  const [
    avaliacaoDefesaCivilZonasDeRisco,
    setAvaliacaoDefesaCivilZonasDeRisco,
  ] = useState({});

  const { user, setUser } = useUsuario();
  const [usuario, setUsuario] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    setZonaDeRisco(zDR);
    console.log(zDR);
    getDataEvaluation();
  }, []);

  //verificando se o usuario estar logado (olhando o local Storage tbm)
  useEffect(() => {
    var data = localStorage.getItem("usuario");
    if (data !== undefined) {
      setUsuario(JSON.parse(data));
    } else {
    }
    console.log(user);
  }, [user]);

  function avaliar() {
    if (usuario) {
      setObj({ tipo: "riscoAvaliacao", obj: zonaDeRisco });
    } else {
      alert("VOCE DEVE ESTAR LOGADO PARA FAZER A AVALIAÇÃO");
      history("/login");
    }
  }

  async function getDataEvaluation() {
    try {
      const { data } = await api.get("/pesquisa/zonaDeRisco/defesaCivil");

      setAvaliacoesDefesaCivilZonasDeRisco(data);
      console.log(data);
      data.map((e) => {
        if (e.idZonaDeRisco === zDiD) {
          updateDf(e);
        }
      });
    } catch {
      console.log(
        "Erro ao consumir avaliação da Defesa Civil sobre Zonas de Risco"
      );
    }
  }

  function updateDf(e) {
    setAvaliacaoDefesaCivilZonasDeRisco(e);
  }

  return (
    <>
      <div key={zonaDeRisco?.id} id="cardContainerZonaDeRisco">
        <div id="cardTitleContainerZdR">
          <div id="cardTitleZdR">
            <div id="cardTitleLine1ZdR">
              <img
                style={{ marginTop: "1vh", width: "4vw", height: "4.5vh" }}
                src={IconZdR}
                alt="Ícone que representa o ponto de apoio. Imagem sde um sino com um escrito SOS"
              />
              <h1>
                <strong>Zona de risco: </strong>
                {zonaDeRisco?.name}
              </h1>
            </div>
            <div id="cardTitleLine2ZdR">
              <div id="learnMore">
                <button
                  tabIndex="1"
                  type="button"
                  className="purpleBtnZdR"
                  id="learnMoreBtnZdR"
                  onClick={() => setObj({ tipo: "risco", obj: zonaDeRisco })}
                >
                  saiba mais
                </button>
              </div>
            </div>
          </div>
          <div id="evaluateBtnDivZdR">
            <button
              tabIndex="1"
              type="button"
              id="evaluateBtnZdR"
              onClick={avaliar}
            >
              Avaliar
            </button>
          </div>
        </div>
        <div id="cardBodyContainerZdR">
          <div className="cardBodyBoxZdR" id="cardBodyBox1ZdR">
            <div className="cardSubTitleZdR">
              <h4>Avaliação População</h4>
            </div>
            <div id="cardContentContainerZdR">
              <div id="cardRatingZdR">
                <AverageGraph />
              </div>
            </div>
            <div className="entendaContainerZdR">
              <button
                onClick={() =>
                  setObj({ tipo: "riscoPesquisa", obj: zonaDeRisco })
                }
                tabIndex="1"
                type="button"
                className="purpleBtnZdR"
                id="learnMoreBtnZdR"
              >
                entenda
              </button>
            </div>
          </div>
          <div className="cardBodyBoxZdR" id="cardBodyBox2ZdR">
            <div className="cardSubTitleZdR">
              <h4>Defesa Civil</h4>
            </div>

            <ul>
              <li className="criteriaDefesaCivilZdR">
                <strong>Inclinação: </strong>
              </li>
              <li className="criteriaResultZdR">
                {avaliacaoDefesaCivilZonasDeRisco?.cd_Declividade}
              </li>
              <li className="criteriaDefesaCivilZdR">
                <strong>Vegetação: </strong>
              </li>
              <li className="criteriaResultZdR">
                {avaliacaoDefesaCivilZonasDeRisco?.cd_Vegetacao}
              </li>
              <li className="criteriaDefesaCivilZdR">
                <strong>Geológico: </strong>
              </li>
              <li className="criteriaResultZdR">
                {avaliacaoDefesaCivilZonasDeRisco?.cd_Geologicos}
              </li>
              <li className="criteriaDefesaCivilZdR">
                <strong>Drenagem: </strong>
              </li>
              <li className="criteriaResultZdR">
                {avaliacaoDefesaCivilZonasDeRisco?.cd_Drenagem}
              </li>
            </ul>

            <div className="entendaContainerZdR">
              <button
                tabIndex="1"
                type="button"
                className="purpleBtnZdR"
                id="learnMoreBtnZdR"
                onClick={() => window.open(Pdf)}
                
              >
                entenda
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="endBarZdR"></div>
    </>
  );
}

export default CardZonaDeRisco;

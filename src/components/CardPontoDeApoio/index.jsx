import React, { useEffect, useState } from "react";
import { useClickObj } from "../../context/ClickObj";
import { api } from "../../services/api";
import AverageGraph from "../AverageGraph";
import IconPdA from "../../assets/icons/sos.png";
import "./style.css";
import { useUsuario } from "../../context/UsuarioContext";
import { useNavigate } from "react-router-dom";
function CardPontoDeApoio({ pDA, pAiD }) {
  const { obj, setObj } = useClickObj();
  const { user, setUser } = useUsuario();
  const [usuario, setUsuario] = useState([]);
  const history = useNavigate();
  const [pontoDeApoio, setPontoDeApoio] = useState({});
  useEffect(() => {
    setPontoDeApoio(pDA);
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
      setObj({ tipo: "apoioAvaliacao", obj: pontoDeApoio });
    } else {
      alert("VOCE DEVE ESTAR LOGADO PARA FAZER A AVALIAÇÃO");
      history("/login");
    }
  }

  return (
    <>
      <div key={pontoDeApoio?.id} id="cardContainerPontoDeApoio">
        <div id="cardTitleContainerPdA">
          <div id="cardTitlePdA">
            <div id="cardTitleLine1PdA">
              <img
                style={{ marginTop: "1vh", width: "4vw", height: "4.5vh" }}
                src={IconPdA}
                alt="Ícone que representa o ponto de apoio. Imagem sde um sino com um escrito SOS"
              />
              <h1>
                <strong>Ponto de Apoio: </strong>
                {pontoDeApoio?.name}
              </h1>
            </div>
            <div id="cardTitleLine2PdA">
              <div id="learnMore">
                <button
                  tabIndex="1"
                  type="button"
                  className="purpleBtnPdA"
                  id="learnMoreBtnPdA"
                  onClick={() => setObj({ tipo: "apoio", obj: pontoDeApoio })}
                >
                  saiba mais
                </button>
              </div>
            </div>
          </div>
          <div id="evaluateBtnDivPdA">
            <button
              tabIndex="1"
              type="button"
              id="evaluateBtnPdA"
              onClick={avaliar}
            >
              Avaliar
            </button>
          </div>
        </div>
        <div id="cardBodyContainerPdA">
          <div className="cardBodyBoxPdA" id="cardBodyBox1PdA">
            <div className="cardSubTitlePdA">
              <h4>Informações</h4>
            </div>
            <ul>
              <li className="criteriaDefesaCivilPdA">
                <strong>Contato: </strong>
              </li>
              <li className="criteriaResultPdA">{pontoDeApoio?.telephone}</li>
              <li className="criteriaDefesaCivilPdA">
                <strong>Endereço: </strong>
              </li>
              <li className="criteriaResultPdA">
                {pontoDeApoio?.street}, {pontoDeApoio?.number}
              </li>
              {/* <li className="criteriaDefesaCivilPdA">
                <strong>Comunidade: </strong>
              </li>
              <li className="criteriaResultPdA">{pontoDeApoio?.community}</li> */}
            </ul>
          </div>
          <div className="cardBodyBoxPdA" id="cardBodyBox2PdA">
            <div className="cardSubTitlePdA">
              <h4>Avaliação População</h4>
            </div>
            <div id="cardContentContainerPdA">
              <div id="cardRatingPdA">
                <AverageGraph />
              </div>
            </div>
            <div className="entendaContainerPdA">
              <button
                tabIndex="1"
                type="button"
                className="purpleBtnPdA"
                id="learnMoreBtnPdA"
                onClick={() => setObj({ tipo: "apoioPesquisa", obj: pontoDeApoio })}
              >
                entenda
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="endBarPdA"></div>
    </>
  );
}

export default CardPontoDeApoio;

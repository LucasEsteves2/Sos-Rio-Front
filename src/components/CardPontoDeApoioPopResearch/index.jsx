import React, { useEffect, useState } from "react";
import "./style.css";
import Termometer from "../../assets/img/termometer.png";
import { useClickObj } from "../../context/ClickObj";
import { api } from "../../services/api";
import ResearchResultBox from "../ResearchResultBox";
import IconPdA from "../../assets/icons/sos.png";

function CardPontoDeApoioPopResearch() {
  const { obj, setObj } = useClickObj();
  const [apoioEvaluationQuestions, setApoioEvaluationQuestions] = useState([]);
  const [valoresResposta, setValoresResposta] = useState([
    {
      id: 1,
      qText: "Qual nivel do seu conhecimento sobre o funcionamento de um ponto de apoio?",
      qOpt1: "É a ferramenta mais eficaz",
      sumOpt1: 15,
      qOpt2: "Essa ferramenta dá bons resultados",
      sumOpt2: 25,
      qOpt3: "Essa ferramenta ajuda,  mas não o suficiente",
      sumOpt3: 50,
      qOpt4: "Não ajuda",
      sumOpt4: 70,
      qOpt5: "Existem ferramentas melhores",
      sumOpt5: 80
    },
    {
      id: 2,
      qText: "Qual nivel do seu conhecimento sobre as orientações da Defesa Civil para o deslocamento até os pontos de apoio?",
      qOpt1: "Boa qualidade e bem distribuídas espacialmente",
      sumOpt1: 15,
      qOpt2: "Com problemas de vazamento",
      sumOpt2: 25,
      qOpt3: "Rede de esgoto com muitos problemas de vazamento.",
      sumOpt3: 50,
      qOpt4: "Presença de fossa e rede de esgoto com vazamento",
      sumOpt4: 70,
      qOpt5: "Presença de valas à céu aberto",
      sumOpt5: 80
    },
    {
      id: 2,
      qText: "Como você avalia a localização deste centro de apoio?",
      qOpt1: "Ótima qualidade das tubulações e ausência de vazamentos",
      sumOpt1: 15,
      qOpt2: "Baixo nível de vazamentos e em poucos lugares",
      sumOpt2: 25,
      qOpt3: "Médio nível de vazamentos e bem distribuídos pela região",
      sumOpt3: 50,
      qOpt4: "Alto nível de vazamentos e bem distribuídos pela região",
      sumOpt4: 70,
      qOpt5: "Ausência total de abastecimento de água oficial",
      sumOpt5: 80
    },
  ]);
  
  useEffect(() => {
    try {
      api.get("/pontosdeapoio/formulario").then((response) => {
        setApoioEvaluationQuestions(response.data);
      });
    } catch {
      console.log("Erro ao consumir a rota do ponto de apoio");
    }
  }, [obj]);
  return (
    <>
      <div id="fullCardContainerPdAFResearch">
        <div id="cardContainerPdAFResearch">
          <div className="entendaContainerPdAF">
            <button
              tabIndex="1"
              type="button"
              className="purpleBtnPdAF"
              id="goBackPdAFResearch"
              onClick={() => setObj({ tipo: "apoio", obj: obj.obj  })}
            >
              voltar
            </button>
          </div>
          <div id="cardTitleContainerPdAFResearch">
            <div id="cardTitlePdAFResearch">
              <div id="cardTitleLine1PdAFResearch">
              <img style={{marginTop:"3vh", width:"4vw", height:"4vh"}} src={IconPdA} alt="Ícone que representa o ponto de apoio. Imagem sde um sino com um escrito SOS"/>
                <h1>
                  <strong>Avaliação Ponto de Apoio: </strong>
                  { obj.obj.name}
                </h1>
              </div>
            </div>
          </div>
          <div id="cardBodyContainerPdAFResearch">
          {
              valoresResposta.map((q) => {
                return (
                  <ResearchResultBox
                  key={q.id}
                  question={q.qText}
                  option1={q.qOpt1}
                  option2={q.qOpt2}
                  option3={q.qOpt3}
                  option4={q.qOpt4}
                  option5={q.qOpt5}
                  sumoption1={q.qOpt1}
                  sumoption2={q.qOpt2}
                  sumoption3={q.qOpt3}
                  sumoption4={q.qOpt4}
                  sumoption5={q.qOpt5}
                  />
                );
              })
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default CardPontoDeApoioPopResearch;

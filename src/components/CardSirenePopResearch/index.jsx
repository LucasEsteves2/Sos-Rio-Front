import React, { useEffect, useState } from "react";
import { useClickObj } from "../../context/ClickObj";
import { api } from "../../services/api";
import ResearchResultBox from "../ResearchResultBox"
import IconSirene from "../../assets/icons/siren.png";
import "./style.css";

function CardSirenePopResearch() {
  const { obj, setObj } = useClickObj();
  const [sirene, setSirene] = useState([]);
  const [sireneEvaluationQuestions, setSireneEvaluationQuestions] = useState([]);
  const [sireneReasearchItems, setSireneReasearchItems] = useState([]);
  const [valoresResposta, setValoresResposta] = useState([
    {
      id: 1,
      qText: "As sirenes são uma boa ferramenta de prevenção?",
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
      qText: "Os moradores acatam as orientações dadas pelas sirenes, para assim reduzir o risco de desastres?",
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
      qText: "São realizados os testes mensais das sirenes?",
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


  console.log(sirene);
  useEffect(() => {
    try {
      api.get("/sirenes/formulario").then((response) => {
        setSireneEvaluationQuestions(response.data);
        console.log(response.data);
      });
    } catch {
      console.log("Erro ao consumir a rota da sirene");
    }
  }, [obj]);
  return (
    <>
      <div id="fullCardContainerSireneFResearch">
        <div id="cardContainerSireneFResearch">
          <div className="entendaContainerSireneF">
            <button
              tabIndex="1"
              type="button"
              className="purpleBtnSireneF"
              id="goBackSireneFResearch"
              onClick={() => setObj({ tipo: "sirene", obj: obj.obj  })}
            >
              voltar
            </button>
          </div>
          <div id="cardTitleContainerSireneFResearch">
            <div id="cardTitleSireneFResearch">
              <div id="cardTitleLine1SireneFResearch">
              <img style={{marginTop:"1vh", width:"4vw", height:"4.5vh"}} src={IconSirene} alt="Ícone que representa o ponto de apoio. Imagem sde um sino com um escrito SOS"/>
                <h1>
                  <strong>Avaliação Sirene: </strong>
                  {obj.obj.name}
                </h1>
              </div>
            </div>
          </div>
          <div id="cardBodyContainerSireneFResearch">
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

export default CardSirenePopResearch;

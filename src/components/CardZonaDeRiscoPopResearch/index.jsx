import React, { useEffect, useState } from "react";
import { useClickObj } from "../../context/ClickObj";
import { api } from "../../services/api";
import ResearchResultBox from "../ResearchResultBox";
import IconZdR from "../../assets/icons/risco.png";
import "./style.css";

function CardZonaDeRiscoPopResearch() {
  const { obj, setObj } = useClickObj();
  const [riscoEvaluationQuestions, setRiscoEvaluationQuestions] = useState([]);
  const [relatorioZdR, setRelatorioZdR] = useState([]);
  const [valoresResposta, setValoresResposta] = useState([
    {
      id: 1,
      qText: "Lançamento de detritos (lixo/entulho) dentro ou nas margens dos rios.",
      qOpt1: "Ausência de lançamento de detritos",
      sumOpt1: 15,
      qOpt2: "Presença de pequena quantidade de detritos",
      sumOpt2: 25,
      qOpt3: "Presença média de detritos",
      sumOpt3: 50,
      qOpt4: "Presença de grande quantidade de detritos",
      sumOpt4: 70,
      qOpt5: "Presença de muito grande quantidades de detritos despejadas frequentemente",
      sumOpt5: 80
    },
    {
      id: 2,
      qText: "Rede de esgoto sanitário",
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
      qText: "Abastecimento de água",
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
      api.get("/zonasderisco/formulario").then((response) => {
        setRiscoEvaluationQuestions(response.data);
      });
    } catch {
      console.log("Erro ao consumir a rota das perguntas para Zona de Risco");
    }

    try {
      api.get(`/zonasderisco/${obj.obj.id}/respostaszdr`).then((response) => {
        setRelatorioZdR(response.data);
      });
    } catch {
      console.log("Erro ao consumir a rota das perguntas para Zona de Risco");
    }

  }, []);


  console.log(riscoEvaluationQuestions);
  console.log(relatorioZdR)



  // function checkAnswers(quest) {

  //   const valores = [];

  //   relatorioZdR.map((i) => {
  //     if (i.textoPergunta === quest) {
  //       valores.push(i.total)
  //       console.log(i.total)
  //     }
  //   }
  //   )

  // }

  // {
  //   () => {
  //     const valores = [];

  //     relatorioZdR.map((i) => {
  //       if (i.textoPergunta === q.textoPergunta) {
  //         valores.push(i.total)
  //       }
  //       setValoresResposta(valores);
  //     }
  //     )
  //   }

  // }

  return (
    <>
      <div id="fullCardContainerZdRFResearch">
        <div id="cardContainerZdRFResearch">
          <div className="entendaContainerZdRF">
            <button
              tabIndex="1"
              type="button"
              className="purpleBtnZdRF"
              id="goBackZdRFResearch"
              onClick={() => setObj({ tipo: "risco", obj: obj.obj })}
            >
              voltar
            </button>
          </div>
          <div id="cardTitleContainerZdRFResearch">
            <div id="cardTitleZdRFResearch">
              <div id="cardTitleLine1ZdRFResearch">
                <img style={{ marginTop: "3vh", width: "4vw", height: "4.5vh" }} src={IconZdR} alt="Ícone que representa o ponto de apoio. Imagem sde um sino com um escrito SOS" />
                <h1>
                  <strong>Avaliação Zona de Risco: </strong>
                  {obj.obj.name}
                </h1>
              </div>
            </div>
          </div>
          <div id="cardBodyContainerZdRFResearch">
            {
              // riscoEvaluationQuestions !== [] && relatorioZdR!== [] ?
              // riscoEvaluationQuestions.map((q) => {

              //   const vals = [];
              //   const valores = relatorioZdR.filter(i => i.textoPergunta === q.textoPergunta);
              //   valores.map(e => vals.push(e.total))
              //   console.log(vals)
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
              // : null
            }

          </div>
        </div>
      </div>
    </>
  );
}

export default CardZonaDeRiscoPopResearch;

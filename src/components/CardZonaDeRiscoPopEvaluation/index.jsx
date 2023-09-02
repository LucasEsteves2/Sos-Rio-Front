import React, { useEffect, useState } from "react";
import { useClickObj } from "../../context/ClickObj";
import { useNavData } from "../../context/NavContext";
import { api } from "../../services/api";
import QuestionCard from "../QuestionCard";
import IconZdR from "../../assets/icons/risco.png";
import "./style.css";

function CardZonaDeRiscoPopEvaluation() {
  const { obj, setObj } = useClickObj();
  const { objSelected, setObjSelected } = useNavData();
  const [risco, setRisco] = useState([]);
  const [riscoEvaluationQuestions, setRiscoEvaluationQuestions] = useState([]);
  const [usuario, setUsuario] = useState([]);

  useEffect(() => {
    try {
      api.get("/zonasderisco/formulario").then((response) => {
        setRiscoEvaluationQuestions(response.data);
        console.log(response.data);
      });
    } catch {
      console.log("Erro ao consumir a rota das perguntas para Zona de Risco");
    }
  }, [obj]);

  useEffect(() => {
    var data = localStorage.getItem("usuario");
    if (data !== undefined) {
      setUsuario(JSON.parse(data));
    } else {
    }
  }, []);

  function clearForm() {
    setObjSelected([]);
  }

  async function handleSubmit() {
    console.log(objSelected);
    try {
      await api.post("/zonasderisco/formulario/feedback", {
        feedback: objSelected,
        idUser: usuario.id,
        idZonaDeRisco: obj.obj.id,
      });
      alert("Obrigado pelo feedback, o resultado da sua avaliação foi enviado para o seu e-mail!!");
      setObj({ tipo: "risco", obj: obj.obj });

    } catch {
      alert("Falha ao comunicar com o servidor");
    }
  }

  return (
    <>
      <div id="fullCardContainer">
        <div id="cardContainerZdREvaluation">
          <div className="entendaContainerZdREvaluation">
            <button
              tabIndex="1"
              type="button"
              className="purpleBtnZdREvaluation"
              id="goBackZdREvaluation"
              onClick={() => {
                setObj({ tipo: "risco", obj: obj.obj });
                clearForm();
              }}
            >
              voltar
            </button>
          </div>
          <div id="cardTitleContainerZdREvaluation">
            <div id="cardTitleZdREvaluation">
              <div id="cardTitleLine1ZdREvaluation">
                <img
                  style={{ marginTop: "1vh", width: "4vw", height: "4.5vh" }}
                  src={IconZdR}
                  alt="Ícone que representa o ponto de apoio. Imagem sde um sino com um escrito SOS"
                />
                <h1>
                  <strong>Zona de Risco: </strong>
                  {obj.obj.name}
                </h1>
              </div>
            </div>
          </div>
          <div id="cardBodyContainerZdREvaluation">
            <div id="formBoxZdREvaluation">
              {riscoEvaluationQuestions.map((q) => {
                return (
                  <QuestionCard
                    QuestionCard
                    key={q.id}
                    qId={q.id}
                    question={q.textoPergunta}
                    options={q.listOptions}
                  />
                );
              })}
            </div>
            <div id="submitDivZdREvaluation">
              <button
                tabIndex="1"
                type="button"
                id="submitBtnZdREvaluation"
                onClick={() => handleSubmit()}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardZonaDeRiscoPopEvaluation;

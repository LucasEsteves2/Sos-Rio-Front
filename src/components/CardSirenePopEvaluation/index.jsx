import React, { useEffect, useState } from "react";
import { useClickObj } from "../../context/ClickObj";
import { useNavData } from "../../context/NavContext";
import { api } from "../../services/api";
import QuestionCard from "../QuestionCard";
import IconSirene from "../../assets/icons/siren.png";
import "./style.css";

function CardSireneEvaluatioPopEvaluation() {
  const { obj, setObj } = useClickObj();
  const { objSelected, setObjSelected } = useNavData();
  const [sirene, setSirene] = useState([]);
  const [sireneEvaluationQuestions, setSireneEvaluationQuestions] = useState(
    []
  );
  const [usuario, setUsuario] = useState([]);

  const [feedback, setFeedback] = useState({ feedback: [] });

  console.log(sireneEvaluationQuestions);
  useEffect(() => {
    var data = localStorage.getItem("usuario");
    if (data !== undefined) {
      setUsuario(JSON.parse(data));
    } else {
    }
  }, []);

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

  function clearForm() {
    setObjSelected([]);
  }

  async function handleSubmit() {
    console.log(objSelected);
    try {
      await api.post("/sirenes/formulario/feedback", {
        feedback: objSelected,
        idUser: usuario.id,
        idSirene: obj.obj.id,
      });
      alert(
        "Obrigado pelo feedback, o resultado da sua avaliação foi enviado para o seu e-mail!!"
      );
      setObj({ tipo: "sirene", obj: obj.obj });
    } catch {
      alert("Falha ao comunicar com o servidor");
    }
  }

  return (
    <>
      <div id="fullCardContainer">
        <div id="cardContainerSireneEvaluation">
          <div className="entendaContainerSireneEvaluation">
            <button
              tabIndex="1"
              type="button"
              className="purpleBtnSireneEvaluation"
              id="goBackSireneEvaluation"
              onClick={() => {
                setObj({ tipo: "sirene", obj: obj.obj });
                clearForm();
              }}
            >
              voltar
            </button>
          </div>
          <div id="cardTitleContainerSireneEvaluation">
            <div id="cardTitleSireneEvaluation">
              <div id="cardTitleLine1SireneEvaluation">
                <img
                  style={{ marginTop: "1vh", width: "4vw", height: "4.5vh" }}
                  src={IconSirene}
                  alt="Ícone que representa o ponto de apoio. Imagem sde um sino com um escrito SOS"
                />
                <h1>
                  <strong>Sirene: </strong>
                  {obj.obj.name}
                </h1>
              </div>
            </div>
          </div>
          <div id="cardBodyContainerSireneEvaluation">
            <div id="formBoxSireneEvaluation">
              {sireneEvaluationQuestions.map((q) => {
                return (
                  <QuestionCard
                    key={q.id}
                    qId={q.id}
                    question={q.textoPergunta}
                    options={q.listOptions}
                  />
                );
              })}
            </div>
            <div id="submitDivSireneEvaluation">
              <button
                tabIndex="1"
                type="button"
                id="submitBtnSireneEvaluation"
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

export default CardSireneEvaluatioPopEvaluation;

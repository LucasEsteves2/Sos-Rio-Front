import React, { useEffect, useState } from "react";
import { useClickObj } from "../../context/ClickObj";
import { useNavData } from "../../context/NavContext";
import { api } from "../../services/api";
import QuestionCard from "../QuestionCard";
import IconPdA from "../../assets/icons/sos.png";
import "./style.css";

function CardPontoDeApoioPopEvaluation() {
  const { obj, setObj } = useClickObj();
  const { objSelected, setObjSelected } = useNavData();
  const [apoio, setApoio] = useState([]);
  const [apoioEvaluationQuestions, setApoioEvaluationQuestions] = useState([]);
  const [pontoDeApoio, setPontoDeApoio] = useState({});
  const [usuario, setUsuario] = useState([]);

  //pegando usuario auth
  useEffect(() => {
    var data = localStorage.getItem("usuario");
    if (data !== undefined) {
      setUsuario(JSON.parse(data));
    } else {
    }
  }, []);

  useEffect(() => {
    try {
      api.get("/pontosdeapoio/formulario").then((response) => {
        setApoioEvaluationQuestions(response.data);
      });
    } catch {
      console.log("Erro ao consumir a rota do ponto de apoio");
    }

    console.log(obj.obj);
  }, [obj]);

  function clearForm() {
    setObjSelected([]);
  }

  async function handleSubmit() {
    console.log(objSelected);
    try {
      await api.post("/pontosdeapoio/formulario/feedback", {
        feedback: objSelected,
        idUser: usuario.id,
        idPontoDeApoio: obj.obj.id,
      });
      alert(
        "Obrigado pelo feedback, o resultado da sua avaliação foi enviado para o seu e-mail!!"
      );
      setObj({ tipo: "apoio", obj: obj.obj });
    } catch {
      alert("Falha ao comunicar com o servidor");
    }
  }

  return (
    <>
      <div id="fullCardContainer">
        <div id="cardContainerPdAEvaluation">
          <div className="entendaContainerPdAEvaluation">
            <button
              tabIndex="1"
              type="button"
              className="purpleBtnPdAEvaluation"
              id="goBackPdAEvaluation"
              onClick={() => {
                setObj({ tipo: "apoio", obj: obj.obj });
                clearForm();
              }}
            >
              voltar
            </button>
          </div>
          <div id="cardTitleContainerPdAEvaluation">
            <div id="cardTitlePdAEvaluation">
              <div id="cardTitleLine1PdAEvaluation">
                <img
                  style={{ marginTop: "1vh", width: "4vw", height: "4vh" }}
                  src={IconPdA}
                  alt="Ícone que representa o ponto de apoio. Imagem sde um sino com um escrito SOS"
                />
                <h1>
                  <strong>Ponto de Apoio: </strong>
                  {obj.obj.name}
                </h1>
              </div>
            </div>
          </div>
          <div id="cardBodyContainerPdAEvaluation">
            <div id="formBoxPdAEvaluation">
              {apoioEvaluationQuestions.map((q) => {
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
            <div id="submitDivPdAEvaluation">
              <button
                tabIndex="1"
                type="button"
                id="submitBtnPdAEvaluation"
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

export default CardPontoDeApoioPopEvaluation;

import React, { useEffect, useState } from "react";
import { useClickObj } from "../../context/ClickObj";
import { useFiltro } from "../../context/FiltroContext";
import { api } from "../../services/api";
import AverageGraph from "../AverageGraph";
import IconZdR from "../../assets/icons/risco.png";
import { useUsuario } from "../../context/UsuarioContext";
import { useNavigate } from "react-router-dom";
// MODAL
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import {
  TextField,
  Grid,
  Link,
  Snackbar,
  IconButton,
  Stack,
  Button,
} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import "./style.css";
import Pdf from "../../assets/Parâmetros Defesa Civil.pdf";

//esse da pra OTIMIZAR
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CardZonaDeRiscoFull() {
  const { obj, setObj } = useClickObj();
  const { filtro, setFiltro } = useFiltro();
  const [risco, setRisco] = useState([]);
  console.log(risco);
  const { user, setUser } = useUsuario();
  const [usuario, setUsuario] = useState([]);
  const history = useNavigate();

  // MODAL
  const [feedback, setFeedback] = useState([]);
  const [show, setShow] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [alertMensagem, setAlertMensagem] = useState({
    mensagem: null,
    cor: null,
  });

  useEffect(() => {
    try {
      api.get(`/zonasderisco/${obj.obj.id}`).then((response) => {
        setRisco(response.data);
        console.log(response.data);
      });
    } catch {
      console.log("Erro ao consumir a rota da zona de risco");
    }
  }, [obj]);

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
      setObj({ tipo: "riscoAvaliacao", obj: risco });
    } else {
      alert("VOCE DEVE ESTAR LOGADO PARA FAZER A AVALIAÇÃO");
      history("/login");
    }
  }

  function handleComment() {
    //verificando se o usuario esta auth
    if (usuario) {
      handleShow();
    } else {
      alert("Voce deve estar logado para realizar o feedback");
      history("/login");
    }
  }

  async function salvar() {
    try {
      await api.post("/zonasderisco/comentarios/feedback", {
        idZonadeRisco: risco.id,
        idUser: usuario.id,
        textComment: feedback,
      });
      modalAlert("Feedback enviado com sucesso!!", "success");
      handleClose();
    } catch {
      modalAlert("Feedback enviado com sucesso!!", "success");
    }
  }

  function modalAlert(msg, cor) {
    setAlertMensagem({
      mensagem: msg,
      cor: cor,
    });
    setFeedback("");
    handleClick();
  }

  const handleClose = () => {
    setFeedback("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <div id="fullCardContainer">
        <div id="cardContainerZonaDeRiscoFullZdRF">
          <div className="entendaContainerZdRF">
            <button
              tabIndex="1"
              type="button"
              className="purpleBtnZdRF"
              id="goBackZdRF"
              onClick={() => {
                setObj({ tipo: "voltar", obj: risco });
                setFiltro({ sirene: true, risco: true, ponto: true });
              }}
            >
              voltar
            </button>
          </div>
          <div id="cardTitleContainerZdRF">
            <div id="cardTitleZdRF">
              <div id="cardTitleLine1ZdRF">
                <img
                  style={{ marginTop: "1vh", width: "4vw", height: "4.5vh" }}
                  src={IconZdR}
                  alt="Ícone que representa o ponto de apoio. Imagem sde um sino com um escrito SOS"
                />
                <h1>
                  <strong>Zona de risco: </strong>
                  {risco.name}
                </h1>
              </div>
              <div id="learnMore">
                <button
                  tabIndex="1"
                  type="button"
                  className="purpleBtnZdRF"
                  id="sendCommentZdRF"
                  onClick={() => handleComment()}
                >
                  Envie seu comentário
                </button>
              </div>
            </div>
            <div id="evaluateBtnDivZdRF">
              <button
                tabIndex="1"
                type="button"
                id="evaluateBtnZdRF"
                onClick={avaliar}
              >
                Avaliar
              </button>
            </div>
          </div>
          <div id="cardBodyContainerZdRF">
            <div className="cardBodyBoxZdRF" id="cardBodyBox2ZdRF">
              <div id="ZdrBox1">
                <h4>Avaliação Defesa Civil</h4>
              </div>
              <ul>
                <li className="criteriaDefesaCivilZdRF">
                  <strong>Inclinação: </strong>Entre 30 graus e 45 graus
                </li>
                <li className="criteriaDefesaCivilZdRF">
                  <strong>Vegetação: </strong>Vegetação Rupestre
                </li>
                <li className="criteriaDefesaCivilZdRF">
                  <strong>Geológico: </strong>Afloramento de Rocha
                </li>
                <li className="criteriaDefesaCivilZdRF">
                  <strong>Drenagem: </strong>Rio Quitandinha
                </li>
              </ul>
              <div className="entendaContainerZdRF">
                <button
                  tabIndex="1"
                  type="button"
                  className="purpleBtnZdRF"
                  id="learnMoreBtn"
                  onClick={() => window.open(Pdf)}
                >
                  entenda
                </button>
              </div>
            </div>
            <div id="endBarZdRF"></div>
            <div id="cardBodyBox1ZdRF">
              <div id="ZdrBox2">
                <h4>Avaliação População</h4>
              </div>
              <div id="cardContentContainerZdRF">
                <div id="ratingBoxZdRF">
                  <AverageGraph />
                </div>
                <div id="ratingBoxDescriptionZdRF">
                  <p>
                    Média da avaliação da população sobre a zona de risco.
                    Quanto maior o número, pior. Quanto menor o número, melhor.
                  </p>
                </div>
              </div>
              <div className="entendaContainerZdRF">
                <button
                  tabIndex="1"
                  type="button"
                  className="purpleBtnZdRF"
                  id="learnMoreBtn"
                  onClick={() => setObj({ tipo: "riscoPesquisa", obj: risco })}
                >
                  entenda
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}

      <div class="modal">
        <Modal
          show={show}
          onHide={handleClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              salvar();
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Adicionar Feedback</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label className="mx-auto my-1">Comentário: </Form.Label>
                <Form.Control
                  as="textarea"
                  rows="4"
                  name="address"
                  required
                  placeholder="Digite seu comentário..."
                  value={feedback}
                  onChange={(e) => {
                    setFeedback(e.target.value);
                  }}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="success" type="submit">
                Salvar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose2}>
        <Alert
          onClose={handleClose2}
          severity={alertMensagem.cor}
          sx={{ width: "100%" }}
        >
          {alertMensagem.mensagem}
        </Alert>
      </Snackbar>
    </>
  );
}

export default CardZonaDeRiscoFull;

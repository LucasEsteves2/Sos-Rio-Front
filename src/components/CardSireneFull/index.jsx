import React, { useEffect, useState } from "react";
import { useClickObj } from "../../context/ClickObj";
import { useFiltro } from "../../context/FiltroContext";
import { api } from "../../services/api";
import AverageGraph from "../AverageGraph";
import IconSirene from "../../assets/icons/siren.png";
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

//esse da pra OTIMIZAR
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CardSireneFull() {
  const { obj, setObj } = useClickObj();
  const { filtro, setFiltro } = useFiltro();
  const [sirene, setSirene] = useState([]);
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
      api.get(`/sirenes/${obj.obj.id}`).then((response) => {
        setSirene(response.data);
        console.log(response.data);
      });
    } catch {
      console.log("Erro ao consumir a rota da sirene");
    }
  }, [obj]);

  useEffect(() => {
    var data = localStorage.getItem("usuario");
    if (data !== undefined) {
      setUsuario(JSON.parse(data));
    } else {
    }
    console.log(user);
  }, [user]);

  async function handleSubmit() {
    if (usuario) {
      try {
        await api.post("/sirenes/alerta/usuario", {
          idSirene: sirene.id,
          idUser: usuario.id,
        });
        alert("Você receberá um e-mail de notificação quando essa sirene for acionada");
      } catch {
        alert("Falha ao comunicar com o servidor");
      }
    } else {
      alert("Você deve estar logado para ter acesso a essa opção");
      history("/login");
    }
  }

  function handleComment() {
    //verificando se o usuario esta auth
    if (usuario) {
      handleShow();
    } else {
      alert("Você deve estar logado para realizar o feedback");
      history("/login");
    }
  }

  async function salvar() {
    try {
      await api.post("/sirenes/comentarios/feedback", {
        idSirene: sirene.id,
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

  function avaliar() {
    if (usuario) {
      setObj({ tipo: "sireneAvaliacao", obj: sirene });
    } else {
      alert("VOCE DEVE ESTAR LOGADO PARA FAZER A AVALIAÇÃO");
      history("/login");
    }
  }

  return (
    <>
      <div id="fullCardContainer">
        <div id="cardContainerSireneF">
          <div className="entendaContainerSireneF">
            <button
              tabIndex="1"
              type="button"
              className="purpleBtnSireneF"
              id="goBackSireneF"
              onClick={() => {
                setObj({ tipo: "voltar", obj: sirene });
                setFiltro({ sirene: true, risco: true, ponto: true });
              }}
            >
              voltar
            </button>
          </div>
          <div id="cardTitleContainerSireneF">
            <div id="cardTitleSireneF">
              <div id="cardTitleLine1SireneF">
                <img
                  style={{ marginTop: "1vh", width: "4vw", height: "4.5vh" }}
                  src={IconSirene}
                  alt="Ícone que representa o ponto de apoio. Imagem sde um sino com um escrito SOS"
                />
                <h1>
                  <strong>Sirene: </strong>
                  {sirene.name}
                </h1>
              </div>
              <div id="learnMore">
                <button
                  tabIndex="1"
                  type="button"
                  className="purpleBtnSireneF"
                  id="sireneFSubscriptionBtn"
                  onClick={() => handleSubmit()}
                >
                  Seja alertado quando a Sirene for acionada
                </button>

                <button
                  tabIndex="1"
                  type="button"
                  className="purpleBtnSirene"
                  id="sendCommentSirene"
                  onClick={() => handleComment()}
                >
                  Envie seu comentário
                </button>
              </div>
            </div>
            <div id="evaluateBtnDivSireneF">
              <button
                tabIndex="1"
                type="button"
                id="evaluateBtnSireneF"
                onClick={avaliar}
              >
                Avaliar
              </button>
            </div>
          </div>
          <div id="cardBodyContainerSireneF">
            <div className="cardBodyBoxSireneF" id="cardBodyBox2SireneF">
              <div className="cardSubTitleSireneF">
                <h4>Informações</h4>
              </div>
              <ul>
                <li className="sireneInformation">
                  <strong>Descrição: </strong>
                  {sirene.description}
                </li>
                <li className="sireneInformation">
                  <strong>Endereço: </strong>
                  {sirene.adress}
                </li>
                <li className="sireneInformation">
                  <strong>Bairro: </strong>
                  {sirene.area}
                </li>
              </ul>
              <div id="endBarSireneF"></div>
              <div className="cardRatingSireneF">
                <h3 id="cardRatingH3SireneF">Raio de Alcance:</h3>
                <h1 id="cardRatingH1SireneF2">{sirene.radius}</h1>
              </div>
            </div>
            <div id="endBarSireneF"></div>
            <div id="cardBodyBox1SireneF">
              <div className="cardSubTitleSireneF">
                <h4>Avaliação População</h4>
              </div>
              <div id="cardContentContainerSireneF">
                <div id="ratingBoxSireneF">
                  <AverageGraph />
                </div>
                <div id="ratingBoxDescriptionSireneF">
                  <p>
                    Média da avaliação da população sobre a sirene. Quanto maior
                    o número, pior. Quanto menor o número, melhor.
                  </p>
                </div>
              </div>
              <div className="entendaContainerSireneF">
                <button
                  tabIndex="1"
                  type="button"
                  className="purpleBtnSireneF"
                  id="learnMoreBtn"
                  onClick={() =>
                    setObj({ tipo: "sirenePesquisa", obj: sirene })
                  }
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

export default CardSireneFull;

import React, { useEffect, useState } from "react";
import { useClickObj } from "../../context/ClickObj";
import { useFiltro } from "../../context/FiltroContext";
import { api } from "../../services/api";
import AverageGraph from "../AverageGraph";
import IconPdA from "../../assets/icons/sos.png";
import "./style.css";
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

//esse da pra OTIMIZAR
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CardPontoDeApoioFull() {
  const { obj, setObj } = useClickObj();
  const { filtro, setFiltro } = useFiltro();
  const [apoio, setApoio] = useState([]);
  const { user, setUser } = useUsuario();
  const [usuario, setUsuario] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [alertMensagem, setAlertMensagem] = useState({
    mensagem: null,
    cor: null,
  });
  const history = useNavigate();
  // MODAL
  const [show, setShow] = useState(false);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    try {
      api.get(`/pontosdeapoio/${obj.obj.id}`).then((response) => {
        setApoio(response.data);
        console.log(response.data);
      });
    } catch {
      console.log("Erro ao consumir a rota dos Pontos de Apoio");
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
      setObj({ tipo: "apoioAvaliacao", obj: apoio });
    } else {
      alert("VOCE DEVE ESTAR LOGADO PARA REALIZAR A AVALIAÇÃO");
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
      await api.post("/pontosdeapoio/comentarios/feedback", {
        idPontodeApoio: apoio.id,
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
        <div id="cardContainerZonaDeRiscoFullPdAF">
          <div className="entendaContainerPdAF">
            <button
              tabIndex="1"
              type="button"
              className="purpleBtnPdAF"
              id="goBackPdAF"
              onClick={() => {
                setObj({ tipo: "voltar", obj: apoio });
                setFiltro({ sirene: true, risco: true, ponto: true });
              }}
            >
              voltar
            </button>
          </div>
          <div id="cardTitleContainerPdAF">
            <div id="cardTitlePdAF">
              <div id="cardTitleLine1PdAF">
                <img
                  style={{ marginTop: "1vh", width: "4vw", height: "4vh" }}
                  src={IconPdA}
                  alt="Ícone que representa o ponto de apoio. Imagem sde um sino com um escrito SOS"
                />
                <h1>
                  <strong>Ponto de Apoio: </strong>
                  {apoio.name}
                </h1>
              </div>
              <div id="learnMore">
                <button
                  tabIndex="1"
                  type="button"
                  className="purpleBtnPdAF"
                  id="sendCommentPdAF"
                  onClick={() => handleComment()}
                >
                  Envie seu comentário
                </button>
              </div>
            </div>
            <div id="evaluateBtnDivPdAF">
              <button
                tabIndex="1"
                type="button"
                id="evaluateBtnPdAF"
                onClick={avaliar}
              >
                Avaliar
              </button>
            </div>
          </div>
          <div id="cardBodyContainerPdAF">
            <div className="cardBodyBoxPdAF" id="cardBodyBox2PdAF">
              <div className="cardSubTitlePdAF">
                <h4>Informações</h4>
              </div>
              <ul>
                <li className="criteriaDefesaCivilPdAF">
                  <strong>Descrição: </strong>
                  {apoio.description}
                </li>
                <li className="criteriaDefesaCivilPdAF">
                  <strong>Endereço: </strong>
                  {apoio.street}
                </li>
                <li className="criteriaDefesaCivilPdAF">
                  <strong>Cep: </strong>
                  {apoio.cep}
                </li>
                {/* <li className="criteriaDefesaCivilPdAF">
                  <strong>Comunidade: </strong>
                  {apoio.community}
                </li> */}
              </ul>
              <div id="endBarPdAF"></div>
              <ul>
                <li className="criteriaDefesaCivilPdAF">
                  <strong>Nome do Responsável: </strong>
                  {apoio.responsibleName}
                </li>
                <li className="criteriaDefesaCivilPdAF">
                  <strong>Contato: </strong>{apoio.telephone}
                </li>
                <li className="criteriaDefesaCivilPdAF">
                  <strong>Whatsapp: </strong>
                  {apoio.whatsapp}
                </li>
                <li className="criteriaDefesaCivilPdAF">
                  <strong>Email: </strong>
                  {apoio.email}
                </li>
                <li className="criteriaDefesaCivilPdAF">
                  <strong>Instagram: </strong>
                  {apoio.instagram}
                </li>
              </ul>
            </div>
            <div id="endBarPdAF"></div>
            <div id="cardBodyBox1PdAF">
              <div className="cardSubTitlePdAF">
                <h4>Avaliação População</h4>
              </div>
              <div id="cardContentContainerPdAF">
                <div id="ratingBoxPdAF">
                  <AverageGraph />
                </div>
                <div id="ratingBoxDescriptionPdAF">
                  {/* <p> */}
                  Média da avaliação da população sobre o ponto de apoio. Quanto
                  maior o número, pior. Quanto menor o número, melhor.
                  {/* </p> */}
                </div>
              </div>
              <div className="entendaContainerPdAF">
                <button
                  tabIndex="1"
                  type="button"
                  className="purpleBtnPdAF"
                  id="learnMoreBtn"
                  onClick={() => setObj({ tipo: "apoioPesquisa", obj: apoio })}
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

export default CardPontoDeApoioFull;

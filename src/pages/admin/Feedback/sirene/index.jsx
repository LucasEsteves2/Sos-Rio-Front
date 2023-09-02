import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { api } from "../../../../services/api";
// components
import PageTitle from "../../../../components/admin/PageTitle/PageTitle";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
  Button,
  TextField,
} from "@material-ui/core";
// data

const useStyles = makeStyles((theme) => ({
  tableOverflow: {
    overflow: "auto",
  },
}));

export function SireneFeedback() {
  const datatableData = [];
  const datatableDataSirene = [];
  const datatableFeedbACK = [];
  const datatableFeedbACKComment = [];

  const [sirene, setSirene] = useState();
  const [feedback, setFeedback] = useState();
  const [feedbackComment, setFeedbackComment] = useState();
  const [userAlert, setUserAlert] = useState();
  const [pergunta, setPergunta] = useState({
    pergunta: "",
    min: "",
    max: "",
    peso: "",
  });
  console.log(sirene);

  const [option, setOption] = useState({
    idPergunta: "",
    pergunta: "",
    option: "",
    value: "",
  });
  const [show, setShow] = useState(false);
  const [exibirModal, setExibirModal] = useState(false);

  const [render, setRender] = useState();
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const fechar = () => {
    setExibirModal(false);
  };
  const classes = useStyles();
  useEffect(() => {
    getPerguntas();
    getFeedbackComentarios();
    getFeedbackForm();
    getSirneAlert();
  }, [render]);

  async function getPerguntas() {
    var { data } = await api.get("sirenes/formulario");

    data.map((data) => {
      console.log(data.name);
      datatableDataSirene.push([data.id, data.textoPergunta]);
      setSirene(...datatableDataSirene);
    });
    setSirene(datatableDataSirene);
  }

  async function getFeedbackForm() {
    var { data } = await api.get("sirenes/formulario/feedback");

    data.map((data) => {
      console.log(data);
      datatableFeedbACK.push([
        data.sirene.id,
        data.sirene.name,
        data.user.name,
      ]);
      setFeedback(...datatableFeedbACK);
    });

    setFeedback(datatableFeedbACK);
  }

  async function getSirneAlert() {
    var { data } = await api.get("/sirenes/alerta/usuario");

    console.log(data);
    data.map((data) => {
      datatableData.push([
        data.id,
        data.user.name,
        data.sireneName,
        data.sireneId,
      ]);
      setUserAlert(...datatableData);
    });

    setUserAlert(datatableData);
  }

  async function getFeedbackComentarios() {
    var { data } = await api.get("sirenes/comentarios/feedback");

    data.map((data) => {
      datatableFeedbACKComment.push([
        data.idSirene,
        data.user.name,
        data.textComment,
        data.urlImg,
        data.nomeSirene,
      ]);
      setFeedbackComment(...datatableFeedbACKComment);
    });

    setFeedbackComment(datatableFeedbACKComment);
  }

  function salvar() {
    try {
      api.post("sirenes/formulario", {
        textoPergunta: pergunta.pergunta,
        min: pergunta.min,
        max: pergunta.max,
        peso: pergunta.peso,
      });
      alert("Pergunta Cadastrada com sucesso!!");
      setRender(pergunta.pergunta);
      setPergunta({ pergunta: "", min: "", max: "" });
      handleClose();
    } catch {
      alert("DEU MERDA!!");
    }
  }

  async function addOption() {
    console.log(option);
    try {
      await api.post("/sirenes/formulario/options", {
        idQuestion: option.idPergunta,
        option: option.option,
        value: option.value,
      });
      alert("Opção Cadastrada com Sucesso");
      setExibirModal(false);
      setOption("");
    } catch {
      alert("Falha ao comunicar com o host");
    }
  }
  return (
    <>
      <PageTitle
        title="Feedback Sirene"
        button={
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            onClick={() => setShow(true)}
          >
            Adicionar Pergunta
          </Button>
        }
      />

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Lista de Perguntas Cadastradas"
            data={sirene}
            columns={["ID", "Pergunta"]}
            options={{
              filterType: "checkbox",
              onRowClick: (rowData, rowState) => {
                console.log(rowData, rowState);
                setOption({ pergunta: rowData[1], idPergunta: rowData[0] }); //passando o indice 1 (nome da pergunta)
                setExibirModal(true);
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <MUIDataTable
            title="Lista de Comentários"
            data={feedbackComment}
            columns={[
              "IdSirene",
              "Usuario",
              "Feedback",
              "Imagem",
              "Sirene avaliada",
            ]}
            options={{
              filterType: "checkbox",
              onRowsDelete: (e) => {
                console.log(e.data);
              },
              selectableRows: "single",
            }}
          />
        </Grid>
      </Grid>
      <PageTitle
        title="Acionar Sirene"
        button={
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            onClick={() =>
              alert(
                "Um e-mail de alerta foi enviado para todos os usuários cadastrados"
              )
            }
          >
            Alertar Usuários
          </Button>
        }
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Lista de Usuários cadastrados para receber o alerta"
            data={userAlert}
            columns={["ID", "Usuário", "Nome Sirene", "IDSirene", "Data"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <MUIDataTable
            title="Lista de Avaliação"
            data={feedback}
            columns={["ID", "Nome Sirene", "Usuário"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
      </Grid>

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
              <Modal.Title>Adicionar Pergunta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group onSubmit={() => alert("oi")}>
                <Form.Label className="mx-auto my-1">Pergunta: </Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  name="address"
                  value={pergunta.pergunta}
                  onChange={(e) => {
                    setPergunta((prevState) => {
                      return { ...prevState, pergunta: e.target.value };
                    });
                  }}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="success" onClick={salvar}>
                Salvar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>

      {/* MODAL 2 */}

      <div class="modal">
        <Modal
          show={exibirModal}
          onHide={fechar}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Adicionar Opção</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group onSubmit={() => alert("oi")}>
              <Form.Label className="mx-auto my-1">Pergunta: </Form.Label>
              <Form.Control
                as="textarea"
                rows="2"
                name="aa"
                disabled
                value={option.pergunta}
              />

              <Form.Label className="mx-auto my-1">Option: </Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="option"
                value={option.option}
                onChange={(e) => {
                  setOption((prevState) => {
                    return { ...prevState, option: e.target.value };
                  });
                }}
              />

              <Form.Label className="mx-auto my-2">Valor: </Form.Label>
              <Form.Control
                name="option"
                value={option.value}
                onChange={(e) => {
                  setOption((prevState) => {
                    return { ...prevState, value: e.target.value };
                  });
                }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => setExibirModal(false)}>
              Cancelar
            </Button>
            <Button variant="success" onClick={addOption}>
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

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

export function ZonaRiscoFeedback() {
  const datatableData = [];
  const datatableDataSirene = [];
  const datatableFeedbACK = [];
  const datatableFeedbACKComment = [];

  const [sirene, setSirene] = useState();
  const [feedback, setFeedback] = useState();
  const [feedbackComment, setFeedbackComment] = useState([]);
  const [pergunta, setPergunta] = useState({
    pergunta: "",
    min: "",
    max: "",
    peso: "",
  });
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
  }, [render]);

  async function getPerguntas() {
    var { data } = await api.get("zonasderisco/formulario");

    data.map((data) => {
      console.log(data.name);
      datatableDataSirene.push([data.id, data.textoPergunta]);
      setSirene(...datatableDataSirene);
    });
    setSirene(datatableDataSirene);
  }

  async function getFeedbackForm() {
    var { data } = await api.get("zonasderisco/formulario/feedback");

    console.log(data);
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

  async function getFeedbackComentarios() {
    var { data } = await api.get("zonasderisco/comentarios/feedback");

    console.log(data);

    data.map((data) => {
      datatableFeedbACKComment.push([
        data.idRisco,
        data.user.name,
        data.textComment,
        data.urlImg,
        data.nomeZonaRisco,
      ]);
      setFeedbackComment(...datatableFeedbACKComment);
    });

    setFeedbackComment(datatableFeedbACKComment);
  }

  function salvar() {
    try {
      api.post("zonasderisco/formulario", {
        textoPergunta: pergunta.pergunta,
        min: pergunta.min,
        max: pergunta.max,
        peso: pergunta.peso,
      });
      setRender(pergunta.pergunta);
      alert("Pergunta Cadastrada com sucesso!!");
      setPergunta({ pergunta: "", min: "", max: "" });
      handleClose();
    } catch {
      alert("DEU MERDA!!");
    }
  }

  async function addOption() {
    console.log(option);
    try {
      await api.post("/zonasderisco/formulario/options", {
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
        title="Feedback Zonas de Risco"
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
              "IdZonaRisco",
              "Usuario",
              "Feedback",
              "Imagem",
              "Zona avaliada",
            ]}
            options={{
              filterType: "checkbox",
              onRowsDelete: (e) => {
                console.log(e.data[0])
                console.log(feedbackComment[e.data[0].index])
              },
              selectableRows: "single",
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <MUIDataTable
            title="Lista de Avaliação"
            data={feedback}
            columns={["ID", "Nome Sirene", "Usuario"]}
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

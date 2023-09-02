import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import L from "leaflet";
import "leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { ApoionIcon } from "../../../Map/marker";
import ApoioIcone from "../../../../assets/icons/sos.png";
import { Button } from "react-bootstrap";
import "../styles.css";
import {
  TextField,
  Grid,
  Link,
  Snackbar,
  IconButton,
  Stack,
} from "@material-ui/core";
import { viaCep } from "../../../../services/api/viaCep";
import { Cancel } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import { api } from "../../../../services/api";
//deletnado icon padrao
delete L.Icon.Default.prototype._getIconUrl;
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//esse da pra OTIMIZAR

export function CentroApoioMap() {
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: ApoioIcone,
    iconUrl: ApoioIcone,
    iconSize: [40],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
  });
  const [alertMensagem, setAlertMensagem] = useState({
    mensagem: null,
    cor: null,
  });
  const [show, setShow] = useState(false);
  const [map, setMap] = useState(false);
  const [length, setLength] = useState();
  const [form, setForm] = useState({
    id: "",
    nome: "",
    desc: "",
    lat: "",
    lng: "",
    layer: "",
    numero: "",
    email: "",
    responsavel: "",
    telefone: "",
    whatsapp: "",
    cep: "",
    rua: "",
    bairro: "",
    instagram: "",
  });
  const [label, setLabel] = useState({
    bairro: "Bairro",
    logradouro: "Logradouro",
  });
  const [titulo, setTitulo] = useState("ADICIONAR Ponto de Apoio");
  var drawnItems = new L.FeatureGroup();
  //instanciando mapa
  const outerBounds = [
    [-22.222912, -43.374687],
    [-22.582915, -42.986368],
  ];

  const mapa = () => {
    var container = L.DomUtil.get("map");
    if (container != null) {
      container._leaflet_id = null;
    }
    let map = L.map("map", {
      center: [-22.480408945395183, -43.19085630122282],
      zoom: 13,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      minZoom: 13,
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    map.setMaxBounds(outerBounds);
    map.addLayer(drawnItems);
    var drawControl = new L.Control.Draw({
      draw: {
        polygon: false,
        circle: false,
        rectangle: false,
        circlemarker: false,
        polyline: false,
      },
      edit: {
        featureGroup: drawnItems,
      },
    });
    map.addControl(drawControl);

    //EVENTS
    map.on(L.Draw.Event.CREATED, function (event) {
      let centroLayer = event.layer;
      setForm({ lat: event.layer._latlng.lat, lng: event.layer._latlng.lng });
      setTitulo("ADICIONAR PONTO");
      setLabel( {bairro: "Bairro", logradouro: "Logradouro"})
      handleShow();
    });

    map.on("draw:deleted", function (e) {
      var layers = e.layers;
      console.log(layers);
      deleteCentro(layers);
      layers.eachLayer(function (layer) {
        if (layer instanceof L.Circle) {
          layer._map = layer._map || map; // if 'layer._map' is null then 'layer._map' receive 'map' object
          console.log(layer.getBounds());
        }
      });
    });

    map.on("draw:edited", function (e) {
      var layers = e.layers;
      console.log(e);
      setLat_Lng(layers);
    });
  };

  useEffect(() => {
    mapa();
    getCentroApoio();
  }, [map]);

  //consumindo via cep
  useEffect(() => {
    let cep = form.cep;
    async function fetchData() {
      const { data } = await viaCep.get(`${form.cep}/json/`);
      console.log(data);
      setForm((prevState) => {
        return { ...prevState, rua: data.logradouro, bairro: data.bairro };
      });
      setLabel({ bairro: "", logradouro: "" });
    }
    //evitando de ficar disparando requisição toda hora

    if (form.cep != undefined) {
      {
        if (form.cep.length === 8) {
          fetchData();
        }
      }
    }
  }, [form.cep]);

  //GET ALL
  async function getCentroApoio() {
    var { data } = await api.get("/apoios");

    var apoio = data.items
    console.log(apoio)
    // setLength(data.totalItems);

    apoio.map((centro) => {
      console.log("qual foi "+centro)
      var marker = L.marker([centro.coordenadas.latitude, centro.coordenadas.longitude], {
        nome: centro.nome,
        title: "Centro Id : " + centro.id,
        clickable: true,
        icon: ApoionIcon,
        id: centro.id,
        numero: centro.telefone,
        desc: centro.descricao,
        lat: centro.coordenadas.latitude,
        lng: centro.coordenadas.longitude,
        email: centro.email,
        responsavel: centro.responsavel,
        telefone: centro.telephone,
        whatsapp: centro.whatsapp,
        cep: centro.cep,
        rua: centro.street,
        bairro: centro.area,
        instagram: centro.instagram,
      });
      //popup ao passar o mouse
      marker.on("mouseover", function () {
        marker.bindPopup(centro.nome, { offset: L.point(0, -15) }).openPopup();
      });
      marker.on("mouseout", function () {
        marker.closePopup();
      });
      marker.on("dblclick", function () {
        console.log("dblclick");
        setTitulo("EDITAR PONTO");
        setForm((prevState) => {
          return {
            nome: centro.nome,
            desc: centro.descricao,
            lat: centro.coordenadas.latitude,
            lng: centro.coordenadas.longitude,
            id: centro.id,
            telefone: centro.telefone,
            whatsapp: centro.whatsapp,
            email: centro.email,
            responsavel: centro.responsavel,
            cep: centro.cep,
            rua: centro.street,
            bairro: centro.area,
            instagram: centro.instagram,
          };
        });
        handleShow();
      });

      //setando o id pdrão do leaflet para recueprar
      marker._leaflet_id = centro.id;
      drawnItems.addLayer(marker);
      if (data.totalItems === 1) {
        setAlertMensagem({
          mensagem: `${data.totalItems} ponto de apoio ativo foi detectado`,
          cor: "success",
        });
        handleClick();
      } else {
        setAlertMensagem({
          mensagem: ` ${data.totalItems} pontos de apoio ativos foram detectados.`,
          cor: "success",
        });
        handleClick();
      }
    });
  }

  // (POST)
  async function adicionarCentroApoio() {
    console.log(form);
    try {
      await api.post("/apoios", {
        nome: form.nome,
        descricao: form.desc,
        email: form.email,
        instagram: form.instagram,
        telefone: form.numero,
        responsavel: form.responsavel,
        telephone: form.telefone,
        whatsapp: form.whatsapp,
         coordenadas: {
          latitude: form.lat.toString(),
          longitude: form.lng.toString(),
          alcance: "0",
          area: "0",
          endereco: {
              rua: form.rua,
              bairro: form.bairro,
              numero: form.numero,
              cep: form.cep,
              complemento: "mock",
              logradouro: form.rua + '-' + form.bairro + '-' + form.numero + '-' + form.cep
          }
          
        },

      });
      setAlertMensagem({
        mensagem: `Centro cadastrado com sucesso!! `,
        cor: "success",
      });
      handleClick();
      setMap(true);
      handleClose();
      document.location.reload(true);
    } catch {
      setAlertMensagem({
        mensagem: `Erro ao cadastrar o centro de apoio!! `,
        cor: "error",
      });
      handleClick();
    }
  }

  //put
  async function setCentroApoio() {
    console.log(form);
    try {
      var { data } = await api.put("/apoios/" + form.id, {
        nome: form.nome,
        descricao: form.desc,
        email: form.email,
        instagram: form.instagram,
        telefone: form.numero,
        responsavel: form.responsavel,
        telephone: form.telefone,
        whatsapp: form.whatsapp,
         coordenadas: {
          latitude: form.lat.toString(),
          longitude: form.lng.toString(),
          alcance: "0",
          area: "0",
          endereco: {
              rua: form.rua,
              bairro: form.bairro,
              numero: form.numero,
              cep: form.cep,
              complemento: "mock",
              logradouro: form.rua + '-' + form.bairro + '-' + form.numero + '-' + form.cep
          }}
      });
      setAlertMensagem({
        mensagem: `Centro de Apoio atualizado com sucesso!! `,
        cor: "success",
      });
      handleClick();
      handleClose();
      document.location.reload(true);
    } catch {
      setAlertMensagem({
        mensagem: `Erro ao editar o centro de apoio!! `,
        cor: "error",
      });
      handleClick();
    }
  }

  //put latitude&&longitude
  async function setLat_Lng(layer) {
    var { data } = await api.get("/apoios");

    var apoios = data.items;
    apoios.map((centro) => {
      try {
        console.log(layer._layers[centro.id].options.id);
        let id = layer._layers[centro.id].options.id;
        if (id != undefined) {
          api.put("/apoios/" + id, {
            coordenadas: {
              latitude: layer._layers[centro.id]._latlng.lat.toString(),
              longitude: layer._layers[centro.id]._latlng.lng.toString(),
            },
          });
        }
        setAlertMensagem({
          mensagem: `Ponto de Apoio Editado com sucesso!! `,
          cor: "success",
        });
        handleClick();
      } catch {}
    });
  }

  async function deleteCentro(layer) {
    var { data } = await api.get("/apoios");
    var apoio = data.items;
    apoio.map((centro) => {
      try {
        console.log(layer._layers[centro.id].options.id);
        let id = layer._layers[centro.id].options.id;
        if (id != undefined) {
          api.delete("/apoios/" + id);
          setAlertMensagem({
            mensagem: `Ponto  de Apoio Deletado com sucesso!! `,
            cor: "success",
          });
          handleClick();
        }
      } catch {
        setAlertMensagem({
          mensagem: `Erro ao Deletar  ponto  de apoio!! `,
          cor: "error",
        });

        handleClick();
      }
    });
  }

  //verificando se é um post ou um put
  function click() {
    if (titulo == "ADICIONAR PONTO") {
      adicionarCentroApoio();
    } else {
      setCentroApoio();
    }
  }

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const [open, setOpen] = React.useState(false);

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
      <div>
        <div id="map" />
      </div>
      <div class="modal">
        <Modal
          className="mx-auto my-5"
          show={show}
          onHide={handleClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <form
            onSubmit={(event) => {
              event.preventDefault();
              click();
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <TextField
                id="nome"
                name="nome"
                label="Nome"
                type="text"
                variant="outlined"
                margin="normal"
                required
                size="small"
                fullWidth="true"
                value={form.nome}
                onChange={(e) => {
                  setForm((prevState) => {
                    return { ...prevState, nome: e.target.value };
                  });
                }}
              />
              <TextField
                id=" desc"
                name=" desc"
                label=" Descrição"
                type="text"
                variant="outlined"
                margin="normal"
                required
                fullWidth="true"
                size="small"
                value={form.desc}
                onChange={(e) => {
                  setForm((prevState) => {
                    return { ...prevState, desc: e.target.value };
                  });
                }}
              />

              <Grid
                container
                spacing={3}
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <TextField
                    id="lat"
                    name="lat"
                    label="Latitude"
                    type="text"
                    variant="outlined"
                    margin="normal"
                    required
                    size="small"
                    value={form.lat}
                    onChange={(e) => {
                      setForm((prevState) => {
                        return { ...prevState, lat: e.target.value };
                      });
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="lng"
                    name="lng"
                    label="longitude"
                    type="text"
                    variant="outlined"
                    margin="normal"
                    required
                    size="small"
                    value={form.lng}
                    onChange={(e) => {
                      setForm((prevState) => {
                        return { ...prevState, lng: e.target.value };
                      });
                    }}
                  />
                </Grid>
              </Grid>

              <TextField
                id="r"
                name="r"
                label="Responsável"
                type="text"
                variant="outlined"
                margin="normal"
                required
                size="small"
                fullWidth="true"
                value={form.responsavel}
                onChange={(e) => {
                  setForm((prevState) => {
                    return { ...prevState, responsavel: e.target.value };
                  });
                }}
              />
              <TextField
                id="Email"
                name="Email"
                label="E-mail"
                type="email"
                variant="outlined"
                margin="normal"
                required
                size="small"
                fullWidth="true"
                value={form.email}
                onChange={(e) => {
                  setForm((prevState) => {
                    return { ...prevState, email: e.target.value };
                  });
                }}
              />

              <Grid
                container
                spacing={3}
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <TextField
                    id="insta"
                    name="instaa"
                    label="Instagram"
                    type="text"
                    variant="outlined"
                    margin="normal"
                    size="small"
                    value={form.instagram}
                    onChange={(e) => {
                      setForm((prevState) => {
                        return { ...prevState, instagram: e.target.value };
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="wp"
                    name="wpp"
                    label="WhatsApp"
                    type="number"
                    variant="outlined"
                    margin="normal"
                    size="small"
                    value={form.whatsapp}
                    onChange={(e) => {
                      setForm((prevState) => {
                        return { ...prevState, whatsapp: e.target.value };
                      });
                    }}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                spacing={3}
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <TextField
                    id="cep"
                    name="cep"
                    label="CEP"
                    type="number"
                    variant="outlined"
                    margin="normal"
                    required
                    size="small"
                    value={form.cep}
                    onChange={(e) => {
                      setForm((prevState) => {
                        return { ...prevState, cep: e.target.value };
                      });
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="tel"
                    name="tel"
                    label="Telefone"
                    type="number"
                    variant="outlined"
                    margin="normal"
                    required
                    size="small"
                    value={form.telefone}
                    onChange={(e) => {
                      setForm((prevState) => {
                        return { ...prevState, telefone: e.target.value };
                      });
                    }}
                  />
                </Grid>
              </Grid>

              <TextField
                id="Ruaa"
                name="ruaa"
                label={label.logradouro}
                type="text"
                variant="outlined"
                margin="normal"
                required
                disabled={true}
                fullWidth="true"
                size="small"
                value={form.rua}
                onChange={(e) => {
                  setForm((prevState) => {
                    return { ...prevState, rua: e.target.value };
                  });
                }}
              />

              <Grid
                container
                spacing={3}
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <TextField
                    id="bai"
                    name="rro"
                    type="text"
                    variant="outlined"
                    margin="normal"
                    required
                    disabled={true}
                    label={label.bairro}
                    size="small"
                    value={form.bairro}
                    onChange={(e) => {
                      setForm((prevState) => {
                        return { ...prevState, bairro: e.target.value };
                      });
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="numero"
                    name="numero"
                    label="Número"
                    type="number"
                    variant="outlined"
                    margin="normal"
                    required
                    size="small"
                    value={form.numero}
                    onChange={(e) => {
                      setForm((prevState) => {
                        return { ...prevState, numero: e.target.value };
                      });
                    }}
                  />
                </Grid>
              </Grid>
            </Modal.Body>
            <Modal.Footer id="modal-footer">
              <Button variant="danger" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="success" type="submit">
                Salvar
              </Button>
            </Modal.Footer>
          </form>
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

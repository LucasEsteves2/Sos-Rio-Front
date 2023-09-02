import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import L from "leaflet";
import "leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { sireneIcon } from "../../../Map/marker";
import sireneIcone from "../../../../assets/icons/siren.png";
import { Button } from "react-bootstrap";
import "../styles.css";
import { Cancel } from "@material-ui/icons";

import MuiAlert from "@material-ui/lab/Alert";
import { api } from "../../../../services/api";
import {
  TextField,
  Grid,
  Link,
  Snackbar,
  IconButton,
  Stack,
} from "@material-ui/core";
//deletnado icon padrao
delete L.Icon.Default.prototype._getIconUrl;

//esse da pra OTIMIZAR
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function SireneMap() {
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: sireneIcone,
    iconUrl: sireneIcone,
    iconSize: [40],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
  });
  const [show, setShow] = useState(false);
  const [map, setMap] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    desc: "",
    raio: "",
    lat: "",
    lng: "",
    layer: "",
    id: "",
    endereco: "",
    numero: "",
  });
  const [alertMensagem, setAlertMensagem] = useState({
    mensagem: null,
    cor: null,
  });
  const [titulo, setTitulo] = useState("ADICIONAR SIRENE");
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
      let sireneLayer = event.layer;
      setForm({ lat: event.layer._latlng.lat, lng: event.layer._latlng.lng });
      setTitulo("ADICIONAR SIRENE");
      handleShow();
    });

    map.on("draw:deleted", function (e) {
      var layers = e.layers;
      console.log(layers);
      deleteSirene(layers);
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
    getSirene();
  }, [map]);

  //put
  async function setLat_Lng(layer) {
    var { data } = await api.get("/sirenes");

    var sirenes = data.items;


    console.log("meu log")
    sirenes.map((sirene) => {
      try {
        console.log(layer._layers[sirene.id].options.id);
        let id = layer._layers[sirene.id].options.id;
        if (id != undefined) {
          api.put("/sirenes/" + id, {
            nome: layer._layers[sirene.id].options.nome,
            coordenadas: {
              alcance: layer._layers[sirene.id].options.radius,
              latitude: layer._layers[sirene.id]._latlng.lat.toString(),
              longitude: layer._layers[sirene.id]._latlng.lng.toString(),
              endereco:{
                rua: layer._layers[sirene.id].options.endereco,
                numero: layer._layers[sirene.id].options.numero,
                bairro:layer._layers[sirene.id].options.bairro,
              }
            },
          });
        }
        setAlertMensagem({
          mensagem: `Sirene Atualizada com sucesso!! `,
          cor: "success",
        });
        handleClick();
         document.location.reload(true);
      } catch {}
    });
  }

  async function deleteSirene(layer) {
    var { data } = await api.get("/sirenes");
    var sirenes = data.items;
    sirenes.map((sirene) => {
      try {
        console.log(layer._layers[sirene.id].options.id);
        let id = layer._layers[sirene.id].options.id;
        if (id != undefined) {
          api.delete("/sirenes/" + id);
          setAlertMensagem({
            mensagem: `Sirene Deletada com sucesso!! `,
            cor: "success",
          });
          handleClick();
        }
      } catch {
        setAlertMensagem({
          mensagem: `Erro ao Deletar a sirene selecionada!! `,
          cor: "error",
        });

        handleClick();
      }
    });
  }

  //GET ALL
  async function getSirene() {
    try {
      var { data } = await api.get("/sirenes?Endereco=true");

      var sirenes = data.items

      sirenes.map((sirene) => {
        console.log("latitude: " + sirene.coordenadas.latitude)
        var marker = L.marker([sirene.coordenadas.latitude, sirene.coordenadas.longitude], {
          nome: sirene.nome,
          title: "Sirene Id : " + sirene.id,
          clickable: true,
          icon: sireneIcon,
          id: sirene.id,
          lat: sirene.coordenadas.latitude,
          lng: sirene.coordenadas.longitude,
          description: sirene.descricao,
          radius: sirene.coordenadas.alcance,
          endereco: sirene.coordenadas?.endereco?.rua,
          numero: sirene.coordenadas?.endereco?.numero,
          bairro: sirene.coordenadas?.endereco?.bairro,
        });
        //popup ao passar o mouse
        marker.on("mouseover", function () {
          marker
            .bindPopup(sirene.nome, { offset: L.point(0, -15) })
            .openPopup();
        });
        marker.on("mouseout", function () {
          marker.closePopup();
        });
        marker.on("dblclick", function () {
          console.log("dblclick");
          console.log(sirene)
          setTitulo("EDITAR SIRENE");
          setForm((prevState) => {
            return {
              id: sirene.id,
              nome: sirene.nome,
              desc: sirene.descricao,
              raio: sirene.coordenadas.alcance,
              lat: sirene.coordenadas.latitude,
              lng: sirene.coordenadas.longitude,
              endereco: sirene.coordenadas?.endereco?.rua,
              numero: sirene.coordenadas?.endereco?.numero,
              bairro: sirene.coordenadas?.endereco?.bairro,
            };
          });
          handleShow();
        });

        //setando o id pdrão do leaflet para recueprar
        marker._leaflet_id = sirene.id;

        var alcanceSirene = L.circle([sirene.coordenadas.latitude, sirene.coordenadas.longitude], {
          color: "green",
          fillColor: "#94ff8ae2",
          fillOpacity: 0.3,
          radius: sirene.coordenadas.alcance,
        });

        alcanceSirene.on("mouseover", function () {
          marker
            .bindPopup("Alcance:" + sirene.coordenadas.alcance, { offset: L.point(0, -15) })
            .openPopup();
        });
        alcanceSirene.on("mouseout", function () {
          marker.closePopup();
        });

        drawnItems.addLayer(marker);
        drawnItems.addLayer(alcanceSirene);

        console.log(data.totalItems);
        if (data.totalItems === 1) {
          setAlertMensagem({
            mensagem: `${data.totalItems} sirene ativa foi detectada.`,
            cor: "success",
          });
          handleClick();
        } else {
          setAlertMensagem({
            mensagem: `${data.totalItems} sirenes ativas foram detectadas."`,
            cor: "success",
          });
          handleClick();
        }
      });
    } catch {
      setAlertMensagem({
        mensagem: `Nenhuma Sirene Encontrada!! `,
        cor: "error",
      });
      handleClick();
    }
  }

  //faz a requsição para uma nova sirene (POST)
  async function adiconarSirene() {
    console.log(form);
    try {
      await api.post("/sirenes", {
        nome: form.nome,
        descricao: form.desc,
        email: form.email,
        instagram: form.instagram,
        whatsapp: form.whatsapp,
         coordenadas: {
          latitude: form.lat.toString(),
          longitude: form.lng.toString(),
          alcance: form.raio,
          area: "0",
          endereco: {
              rua: form.endereco,
              bairro: form.bairro,
              numero: form.numero,
              cep: "0",
              complemento: "mock",
              logradouro: form.rua + '-' + form.bairro + '-' + form.numero + '-' + form.cep
          }}
      });
      setMap(true);
      handleClose();
      document.location.reload(true);
      setAlertMensagem({
        mensagem: `Sirene Adicionada com sucesso!! `,
        cor: "success",
      });
      handleClick();
    } catch {
      setAlertMensagem({
        mensagem: `SIRENE INVALIDA!! `,
        cor: "error",
      });
      handleClick();
    }
  }

  //put
  async function setSirene() {
    console.log(form);
    try {
      var { data } = await api.put("/sirenes/" + form.id, {
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
          alcance: form.raio,
          area: "0",
          endereco: {
              rua: form.endereco,
              bairro: form.bairro,
              numero: form.numero,
              cep: form.cep,
              complemento: "mock",
              logradouro: form.rua + '-' + form.bairro + '-' + form.numero + '-' + form.cep
          }}
      });
      setAlertMensagem({
        mensagem: `Sirene atualizada com sucesso!! `,
        cor: "success",
      });
      handleClick();
      handleClose();
       document.location.reload(true);
    } catch {
      setAlertMensagem({
        mensagem: `Erro ao editar a sirene selecionada!! `,
        cor: "error",
      });
      handleClick();
    }
  }

  //verificando se é um post ou um put
  function click() {
    if (titulo == "ADICIONAR SIRENE") {
      adiconarSirene();
    } else {
      setSirene();
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
              <TextField
                id="raio"
                name="raio"
                label="Raio"
                type="number"
                variant="outlined"
                margin="normal"
                required
                fullWidth="true"
                size="small"
                value={form.raio}
                onChange={(e) => {
                  setForm((prevState) => {
                    return { ...prevState, raio: e.target.value };
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
                id="Ruaa"
                name="ruaa"
                label="Rua"
                type="text"
                variant="outlined"
                margin="normal"
                required
                fullWidth="true"
                size="small"
                value={form.endereco}
                onChange={(e) => {
                  setForm((prevState) => {
                    return { ...prevState, endereco: e.target.value };
                  });
                }}
              />
              <Grid
                container
                rowSpacing={1}
                spacing={3}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <TextField
                    id="bai"
                    name="rro"
                    label="Bairro"
                    type="text"
                    variant="outlined"
                    margin="normal"
                    required
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
                    id="n"
                    name="n"
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
            <Modal.Footer className=" padding-bottom-xs">
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

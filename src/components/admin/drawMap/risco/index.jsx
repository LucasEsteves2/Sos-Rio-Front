import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import L from "leaflet";
import "leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { riscoIcon } from "../../../Map/marker";
import riscoIcone from "../../../../assets/icons/risco.png";
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
import { viaCep } from "../../../../services/api/viaCep";
//deletnado icon padrao
delete L.Icon.Default.prototype._getIconUrl;

//esse da pra OTIMIZAR
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ZonaRiscoMap() {
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: riscoIcone,
    iconUrl: riscoIcone,
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
    bairro: "",
    cep: "",
    complemento: "",
    rua: "",
    txt: "",
  });
  const [label, setLabel] = useState({
    bairro: "Bairro",
    logradouro: "Logradouro",
  });
  const [alertMensagem, setAlertMensagem] = useState({
    mensagem: null,
    cor: null,
  });
  const [titulo, setTitulo] = useState("ADICIONAR ZONA DE RISCO");
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
      let layer = event.layer;

      console.log(layer._mRadius);
      setForm({
        lat: event.layer._latlng.lat,
        lng: event.layer._latlng.lng,
        raio: layer._mRadius,
      });
      setTitulo("ADICIONAR ZONA DE RISCO");
      handleShow();
    });

    map.on("draw:deleted", function (e) {
      var layers = e.layers;
      console.log(layers);
      deleteArea(layers);
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
    getArea();
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
        if (form.cep.length === 8) fetchData();
      }
    }
  }, [form.cep]);

  //OK
  async function deleteArea(layer) {
    var { data } = await api.get("/riscos");
     var riscos = data.items;
    riscos.map((risco) => {
      try {
        console.log(layer._layers[risco.id].options.id);
        let id = layer._layers[risco.id].options.id;
        if (id != undefined) {
          try{

            api.delete("/riscos/" + id);
            setAlertMensagem({
              mensagem: `Zona de risco Deletada com sucesso!! `,
              cor: "success",
            });
            handleClick();
            // document.location.reload(true);
          }catch (e) {
            setAlertMensagem({
          mensagem: `Erro ao Deletar a Zona de Risco selecionada!! `,
          cor: "error",
         });
          }
        }
      } catch {
       
        handleClick();
      }
    });
  }
  //OK
  //GET ALL
  async function getArea() {
    try {
      var { data } = await api.get("/riscos");

      var riscos = data.items;
      console.log(data);

      riscos.map((area) => {
        var marker = L.marker([area.coordenadas.latitude, area.coordenadas.longitude], {
          nome: area.nome,
          title: "Risco Id : " + area.id,
          clickable: true,
          icon: riscoIcon,
          id: area.id,          
          lat: area.coordenadas.latitude,
          lng: area.coordenadas.longitude,
          description: area.descricao,
          radius: area.coordenadas.alcance,
          endereco: area.coordenadas?.endereco?.rua,
          numero: area.coordenadas?.endereco?.numero,
          bairro: area.coordenadas?.endereco?.bairro,
          cep: area.coordenadas?.endereco?.cep,
        });
        //popup ao passar o mouse
        marker.on("mouseover", function () {
          marker.bindPopup(area.nome, { offset: L.point(0, -15) }).openPopup();
        });
        marker.on("mouseout", function () {
          marker.closePopup();
        });
        marker.on("dblclick", function () {
          console.log("dblclick");
          setTitulo("EDITAR ZONA DE RISCO");
          setForm((prevState) => {
            return {
              id: area.id,
              nome: area.nome,
              desc: area.descricao,
              raio: area.coordenadas.alcance,
              lat: area.coordenadas.latitude,
              lng: area.coordenadas.longitude,
            
              rua: area.coordenadas?.endereco?.rua,
              numero: area.coordenadas?.endereco?.numero,
              bairro: area.coordenadas?.endereco?.bairro,
              cep: area.coordenadas?.endereco?.cep,
            };
          });
          handleShow();
        });

        //setando o id pdrão do leaflet para recueprar
        marker._leaflet_id = area.id;

        var alcanceArea = L.circle([area.coordenadas.latitude, area.coordenadas.longitude], {
          color: "red",
          fillColor: "#ff6e6ee0",
          fillOpacity: 0.3,
          radius: area.coordenadas.alcance,
        });

        alcanceArea.on("mouseover", function () {
          marker
            .bindPopup("Alcance:" + area.coordenadas.alcance, { offset: L.point(0, -15) })
            .openPopup();
        });
        alcanceArea.on("mouseout", function () {
          marker.closePopup();
        });

        drawnItems.addLayer(marker);
        drawnItems.addLayer(alcanceArea);

        console.log(data.totalItems);
        if (data.totalItems === 1) {
          setAlertMensagem({
            mensagem: `${data.totalItems} Zona de Risco ativa foi detectada. `,
            cor: "success",
          });
          handleClick();
        } else {
          setAlertMensagem({
            mensagem: `${data.totalItems} zonas de risco ativas foram detectadas. `,
            cor: "success",
          });
          handleClick();
        }
      });
    } catch {
      setAlertMensagem({
        mensagem: `Falha ao acessar api!! `,
        cor: "error",
      });
      handleClick();
    }
  }
  //OK
  //(POST)
  async function adicionarArea() {
    console.log(form);
    try {
      await api.post("/riscos", {
        nome: form.nome,
        descricao: form.desc,
        coordenadas: {
          latitude: form.lat.toString(),
          longitude: form.lng.toString(),
          alcance: form.raio.toString(),
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
      setMap(true);
      handleClose();
      document.location.reload(true);
      setAlertMensagem({
        mensagem: `Zona de Risco Adicionada com sucesso!! `,
        cor: "success",
      });
      handleClick();
    } catch {
      setAlertMensagem({
        mensagem: `ZONA DE RISCO INVALIDA!! `,
        cor: "error",
      });
      handleClick();
    }
  }

  //OK
  //put
  async function setArea() {
    console.log(form);
    try {
      var { data } = await api.put("/riscos/" + form.id, {
        nome: form.nome,
        descricao: form.desc,
        coordenadas: {
          latitude: form.lat.toString(),
          longitude: form.lng.toString(),
          alcance: form.raio.toString(),
          area: "0",
          endereco: {
              rua: form.rua,
              bairro: form.bairro,
              numero: form.numero,
              cep: "0",
              complemento: "mock",
              logradouro: form.rua + '-' + form.bairro + '-' + form.numero + '-' + form.cep
          }}
      });
      setAlertMensagem({
        mensagem: `Zona de risco atualizada com sucesso!! `,
        cor: "success",
      });
      handleClick();
      handleClose();
      document.location.reload(true);
    } catch {
      setAlertMensagem({
        mensagem: `Erro ao editar a Zona de Risco selecionada!! `,
        cor: "error",
      });
      handleClick();
    }
  }

  //put
  async function setLat_Lng(layer) {
    var { data } = await api.get("/riscos");
    var risco = data.items;
    risco.map((area) => {
      try {
        console.log(layer._layers[area.id].options.id);
        let id = layer._layers[area.id].options.id;
        if (id != undefined) {
          api.put("/riscos/" + id, {
            coordenadas: {
              alcance: layer._layers[area.id].options.radius,
              latitude: layer._layers[area.id]._latlng.lat.toString(),
              longitude: layer._layers[area.id]._latlng.lng.toString(),
              endereco:{
                rua: layer._layers[area.id].options.rua,
                numero: layer._layers[area.id].options.numero,
                bairro:layer._layers[area.id].options.bairro,
              }
            },
          });
        }
        setAlertMensagem({
          mensagem: `Zona de Risco Atualizada com sucesso!! `,
          cor: "success",
        });
        handleClick();
        document.location.reload(true);
      } catch {
      }
    });
  }

  //verificando se é um post ou um put
  function click() {
    if (titulo == "ADICIONAR ZONA DE RISCO") {
      adicionarArea();
    } else {
      setArea();
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
      <div className="modal" >
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
                id="cep"
                name="cep"
                label="CEP"
                type="number"
                variant="outlined"
                margin="normal"
                required
                fullWidth="true"
                size="small"
                value={form.cep}
                onChange={(e) => {
                  setForm((prevState) => {
                    return { ...prevState, cep: e.target.value };
                  });
                }}
              />
              <TextField
                id="Ruaa"
                name="ruaa"
                label={label.logradouro}
                type="text"
                variant="outlined"
                margin="normal"
                required
                fullWidth="true"
                size="small"
                disabled="true"
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
                    label={label.bairro}
                    type="text"
                    variant="outlined"
                    margin="normal"
                    disabled="true"
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

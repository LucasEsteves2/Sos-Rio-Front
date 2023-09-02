import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Tooltip,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import "./styles.css";
import L from "leaflet";
import osm from "../../services/map/osm-providers";
import { api } from "../../services/api";
import { DefaultIcon } from "./marker";
import { ApoionIcon } from "./marker";
import { sireneIcon } from "./marker";
import { riscoIcon } from "./marker";
import { LeafletgeoSearch } from "./LeafletgeoSearch/index";
import { useNavigate, Link } from "react-router-dom";
import { useClickObj } from "../../context/ClickObj";
import { useFiltro } from "../../context/FiltroContext";

//marcando o icone default
L.Marker.prototype.options.icon = DefaultIcon;

const redOptions = { color: "red" };
const blueOptions = { color: "blue" };
const yellowOptions = { color: "#AC8A10" };

const outerBounds = [
  [-22.222912, -43.374687],
  [-22.582915, -42.986368],
];

export function MapComponent() {
  const { obj, setObj } = useClickObj();
  const history = useNavigate();
  const [sirene, setSirene] = useState([]);
  const [apoio, setApoio] = useState([]);
  const [risco, setRisco] = useState([]);
  const { filtro, setFiltro } = useFiltro();

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    try {
      api.get("/sirenes").then((response) => {
        setSirene(response.data);
      });
    } catch {
      console.log("Erro ao consumir a rota das sirenes");
    }

    try {
      api.get("/pontosdeapoio").then((response) => {
        setApoio(response.data);
      });
    } catch {
      console.log("Erro ao consumir os pontos de apoio");
    }

    try {
      api.get("/zonasderisco").then((response) => {
        setRisco(response.data);
      });
    } catch {
      console.log("Erro ao consumir as areas de risco");
    }
  }

  return (
    // Container
    <MapContainer
      center={[-22.480210301510574, -43.18677333242181]}
      bounds={outerBounds}
      maxBounds={outerBounds}
      maxBoundsViscosity={1.0}
      zoom={12}
      maxZoom={18}
      minZoom={12}
      scrollWheelZoom={true}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Visualizar mapa padrão">
          <TileLayer
            url={osm.maptiler.url}
            attribution={osm.maptiler.attribution}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Visualizar mapa via satélite">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Visualizar mapa preto e branco">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
            
          />
        </LayersControl.BaseLayer>

        <LeafletgeoSearch />

    
        {/* map */}
        <LayersControl.Overlay checked={filtro.sirene} name="Sirenes">
          <LayerGroup>
            {sirene.map((sirene, idx) => (
              <Marker
                position={[sirene.latitude, sirene.longitude]}
                key={idx}
                icon={sireneIcon}
                eventHandlers={{
                  click: (e) => {
                    setObj({ tipo: "sirene", obj: sirene });
                  },
                }}
              >
                <Circle
                  center={[sirene.latitude, sirene.longitude]}
                  pathOptions={yellowOptions}
                  radius={sirene.radius}
                  fillOpacity={0.3}
                >
                  <Tooltip sticky>Alcance:{sirene.radius}</Tooltip>
                </Circle>
                <Tooltip sticky>Sirene {sirene.name}</Tooltip>
              </Marker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay checked={filtro.ponto} name="Ponto de Apoio" >
          <LayerGroup >
            {apoio.map((apoio, idx) => (
              <Marker
                position={[apoio.latitude, apoio.longitude]}
                key={idx}
                icon={ApoionIcon}
                eventHandlers={{
                  click: (e) => {
                    setObj({ tipo: "apoio", obj: apoio });
                    console.log(e);
                  },
                }}
              >
                <Tooltip sticky>Ponto de Apoio {apoio.name}</Tooltip>
              </Marker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay checked={filtro.risco} name="Zona de Risco">
          <LayerGroup>
            {risco.map((risco, idx) => (
              <Marker
                position={[risco.latitude, risco.longitude]}
                key={idx}
                icon={riscoIcon}
                eventHandlers={{
                  click: (e) => {
                    setObj({ tipo: "risco", obj: risco });
                    console.log(e);
                  },
                }}
              >
                <Circle
                  center={[risco.latitude, risco.longitude]}
                  pathOptions={redOptions}
                  radius={risco.radius}
                >
                  <Tooltip sticky>Alcance:{risco.radius}</Tooltip>
                </Circle>
                <Tooltip sticky>Zona de Risco {risco.name}</Tooltip>
              </Marker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
}

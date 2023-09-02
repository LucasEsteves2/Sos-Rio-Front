import React from 'react';
import { MapComponent } from "../../components/Map/index.jsx";
import ContentBox from "../../components/ContentBox";
import LegendaMapa from "../../assets/img/legendaMapa.svg";
import CardZonaDeRisco from "../../components/CardZonaDeRisco";
import './style.css';

function Body() {

    return (
        <>
            <div id="bodyContainer">
                <div id="mapContainer">
                    <MapComponent />
                    {/* <div id="legendaMapa">
                        <img src={LegendaMapa} alt="legenda do mapa. COMPLETAR DESCRIÇÃO"/>
                    </div> */}
                </div>
                <div id="contentContainer">
                    <ContentBox />
                </div>
            </div>
        </>
    );
}
export default Body;
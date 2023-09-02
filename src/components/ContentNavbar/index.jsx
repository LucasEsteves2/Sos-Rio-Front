
import React, { useState, useEffect } from 'react';
import { useFiltro } from "../../context/FiltroContext";
import Lens from "../../assets/img/lens.png";
import './style.css';

function ContentNavbar() {
    const [searchTerm, setSearchTerm] = useState("");
    const { filtro, setFiltro } = useFiltro();
/*----------------------- ZDR FILTER STATES ---------------------------------*/
    const [filterZdR, setFilterZdR] = useState(false);
    const [btnZdR, setBtnZdR] = useState("btnFilterZonaDeRisco");
    const [divZdR, setDivZdR] = useState("divFilterZonaDeRisco");
/*----------------------- PDA FILTER STATES ---------------------------------*/
    const [filterPdA, setFilterPdA] = useState(false);
    const [btnPdA, setBtnPdA] = useState("btnFilterPontoDeApoio");
    const [divPdA, setDivPdA] = useState("divFilterPontoDeApoio");
/*----------------------- SIRENE FILTER STATES ---------------------------------*/
    const [filterSir, setFilterSir] = useState(false);
    const [btnSir, setBtnSir] = useState("btnFilterSirene");
    const [divSir, setDivSir] = useState("divFilterSirene");
/*----------------------- SORTING STATES ---------------------------------*/
const [filterBS1, setFilterBS1] = useState(false);
const [btnSort1, setBtnSort1] = useState("btnSort1Off");
/*----------------------- SORTING STATES ---------------------------------*/
const [filterBS2, setFilterBS2] = useState(false);
const [btnSort2, setBtnSort2] = useState("btnSort2Off");
/*----------------------- SORTING STATES ---------------------------------*/
const [filterBS3, setFilterBS3] = useState(false);
const [btnSort3, setBtnSort3] = useState("btnSort3Off");

/*----------------------- ZDR FILTER LISTENER ---------------------------------*/
    useEffect(() => {
        if(filterZdR) {
            setBtnZdR("btnFilterZonaDeRiscoOff");
            setDivZdR("divFilterZonaDeRiscoOff");
        } else {
            setBtnZdR("btnFilterZonaDeRisco");
            setDivZdR("divFilterZonaDeRisco");
        }
    }, [filterZdR]);
/*----------------------- PDA FILTER LISTENER ---------------------------------*/
    useEffect(() => {
        if(filterPdA) {
            setBtnPdA("btnFilterPontoDeApoioOff");
            setDivPdA("divFilterPontoDeApoioOff");
        } else {
            setBtnPdA("btnFilterPontoDeApoio");
            setDivPdA("divFilterPontoDeApoio");
        }
    }, [filterPdA]);
/*----------------------- SIRENE FILTER LISTENER ---------------------------------*/
    useEffect(() => {
        if(filterSir) {
            setBtnSir("btnFilterSireneOff");
            setDivSir("divFilterSireneOff");
        } else {
            setBtnSir("btnFilterSirene");
            setDivSir("divFilterSirene");
        }
    }, [filterSir]);
/*----------------------- SORTING BTN 1 LISTENER ---------------------------------*/
    useEffect(() => {
        if(filterBS1) {
            setBtnSort1("btnSort1On");
        } else {
            setBtnSort1("btnSort1Off");
        }
    }, [filterBS1]);
/*----------------------- SORTING BTN 2 LISTENER ---------------------------------*/
    useEffect(() => {
        if(filterBS2) {
            setBtnSort2("btnSort2On");
        } else {
            setBtnSort2("btnSort2Off");
        }
    }, [filterBS2]);
/*----------------------- SORTING BTN 3 LISTENER ---------------------------------*/
    useEffect(() => {
        if(filterBS3) {
            setBtnSort3("btnSort3On");
        } else {
            setBtnSort3("btnSort3Off");
        }
    }, [filterBS3]);
/*----------------------- SEARCH TERM ---------------------------------*/
    useEffect(() => {
        console.log(searchTerm);
    }, [searchTerm])
    
    
    function setVisibleSirene() {
        setFilterSir(!filterSir);
        setFiltro((prevState) => {
            return { ...prevState, sirene: !filtro.sirene };
          });
    }
    function setVisibleApoio() {
        setFilterPdA(!filterPdA);
        setFiltro((prevState) => {
            return { ...prevState, ponto: !filtro.ponto };
          });

    } function setVisibleRisco() {
        setFilterZdR(!filterZdR);
        setFiltro((prevState) => {
            return { ...prevState, risco: !filtro.risco };
          });
    }

    return (
        <>
            <div id="contentNavbarContainer">
                <h1 id="filterTitle">Filtrar por:</h1>
                <div id="filterBtns">
                    <div id={divZdR}>
                        <button id={btnZdR} type="button" tabIndex="1"  onClick={()=> setVisibleRisco()}>Zona de Risco</button>
                    </div>
                    <div id={divPdA}>
                        <button id={btnPdA} type="button" tabIndex="1" onClick={()=> setVisibleApoio()} >Ponto de Apoio</button>
                    </div>
                    <div id={divSir}>
                        <button id={btnSir} type="button" tabIndex="1"  onClick={()=> setVisibleSirene()}>Sirene</button>
                    </div>
                </div>
                <div id="searchBarContainer">
                    <div id="lensImg">
                        <img src={Lens} alt="Lupa de busca" />
                    </div>
                    <input type="text" id="searchBar" tabIndex="1" value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value)}}/>
                    <button 
                        id="clearSearchBar" 
                        type="button"
                        tabIndex="1"
                        onClick={(e) => setSearchTerm("")}   
                    >X</button>
                </div>
                <div id="sortingBtns">
                    <div class="divSortingClass" id={btnSort1}>
                        <button 
                        class="btnSortingClass" 
                        type="button" 
                        tabIndex="1"
                        onClick={() => {
                            setFilterBS1(!filterBS1);
                        }}>Relevância</button>
                    </div>
                    <div class="divSortingClass" id={btnSort2}>
                        <button 
                        class="btnSortingClass" 
                        type="button" 
                        tabIndex="1"
                        onClick={() => {
                            setFilterBS2(!filterBS2)
                        }}>Distritos</button>
                    </div>
                    <div class="divSortingClass" id={btnSort3}>
                        <button 
                        class="btnSortingClass" 
                        type="button" 
                        tabIndex="1"
                        onClick={() => {
                            setFilterBS3(!filterBS3)
                        }}>Bairro</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContentNavbar;
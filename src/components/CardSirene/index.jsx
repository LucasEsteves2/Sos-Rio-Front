import React, { useEffect, useState } from "react";
import { useClickObj } from "../../context/ClickObj";
import { api } from "../../services/api";
import AverageGraph from "../AverageGraph";
import IconSirene from "../../assets/icons/siren.png";
import './style.css';
import { useUsuario } from "../../context/UsuarioContext";
import { useNavigate } from "react-router-dom";
function CardSirene( {sI, sIiD} ) {
    const { obj, setObj } = useClickObj();
    const [sirene, setSirene] = useState({});
    const { user, setUser } = useUsuario();
    const [usuario, setUsuario] = useState([]);
    const history = useNavigate();
    useEffect(() => {
        setSirene(sI);
    }, []);

    
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
          setObj({ tipo: "sireneAvaliacao", obj: sirene });
        } else {
          alert("VOCE DEVE ESTAR LOGADO PARA FAZER A AVALIAÇÃO");
          
  history("/login");
        }
      }
      


    return (
        <>
            <div key={sirene?.id} id="cardContainerSirene">
                <div id="cardTitleContainerSirene">
                    <div id="cardTitleSirene">
                        <div id="cardTitleLine1Sirene">
                        <img style={{marginTop:"1vh", width:"4vw", height:"4.5vh"}} src={IconSirene} alt="Ícone que representa o ponto de apoio. Imagem sde um sino com um escrito SOS"/>
                            <h1><strong>Sirene: </strong>{sirene?.name}</h1>
                        </div>
                        <div id="cardTitleLine2Sirene">
                            <div id="learnMore">
                                <button 
                                    tabIndex="1"
                                    type="button" 
                                    className="purpleBtnSirene" 
                                    id="learnMoreBtnSirene"
                                    onClick={() => setObj({ tipo: "sirene", obj: sirene })}
                                >saiba mais</button>
                            </div>
                        </div>
                    </div>
                    <div id="evaluateBtnDivSirene">
                        <button 
                            tabIndex="1"
                            type="button" 
                            id="evaluateBtnSirene"
                            onClick={avaliar}
                        >
                            Avaliar
                        </button>
                    </div>
                </div>
                <div id="cardBodyContainerSirene">
                    <div className="cardBodyBoxSirene" id="cardBodyBox1Sirene">
                        <div className="cardSubTitleSirene"><h4>Informações</h4></div>
                        <ul>
                            <li className="criteriaDefesaCivilSirene"><strong>Raio de Alcance: </strong></li>
                            <li className="criteriaResultSirene">{sirene?.radius} m</li>
                            <li className="criteriaDefesaCivilSirene"><strong>Endereço: </strong></li>
                            <li className="criteriaResultSirene">{sirene?.adress}, {sirene?.number}</li>
                            <li className="criteriaDefesaCivilSirene"><strong>Bairro: </strong></li>
                            <li className="criteriaResultSirene">{sirene?.area}</li>
                        </ul>
                    </div>
                    <div className="cardBodyBoxSirene" id="cardBodyBox2Sirene">
                        <div className="cardSubTitleSirene">
                            <h4>Avaliação População</h4>
                        </div>
                        <div id="cardContentContainerSirene">
                            <div id="cardRatingSirene">
                                <AverageGraph />
                            </div>
                        </div>
                        <div className="entendaContainerSirene">
                            <button 
                                tabIndex="1"
                                type="button" 
                                className="purpleBtnSirene" 
                                id="learnMoreBtnSirene"
                                onClick={() => setObj({ tipo: "sirenePesquisa", obj: sirene })}
                            >entenda</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="endBarSirene"></div>
        </>
    );
};

export default CardSirene;
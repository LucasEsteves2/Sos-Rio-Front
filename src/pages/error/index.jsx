import React from "react";
import Img404 from "../../assets/img/404nave.png";
import"./404.css"
import { Errinho } from './style';

export function  Pagina404 () {

	return (
		<Errinho>  
<main className="container flex flex--centro flex--coluna" style={{ justifyContent: "center", alignItems: "center" }}>
		<img className="doguito-imagem" src={Img404} alt="ilustração doguito"/>
	  </main>
	  </Errinho>
	)
};
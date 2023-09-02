import React from "react";
import { useClickObj } from "../../context/ClickObj";
import { useNavigate } from "react-router-dom";
import AcessibilityLogo from "../../assets/icons/accessibility.png";
import Logo from "../../assets/icons/logo.png";
import "./style.css";

export default function Header() {
  const { obj, setObj } = useClickObj();
  const history = useNavigate();
  return (
    <>
      <div id="header" tabIndex="1">
        <div id="headerTitle">
          <button
            id="BtnLogin"
            type="button"
            tabIndex="1"
            onClick={() => setObj({ tipo: "voltar", obj: "" })}
          >
            <img id="logoPARI" src={Logo} alt="Logomarca da plataforma PARI" />
          </button>
          <div id="menuAcessibility">
            <div>
              <img id="logoAcess" src={AcessibilityLogo} alt="Símbolo internacional da acessibilidade" />
            </div>
            <ul>
              <li>
                <div>
                  Fonte <button>+</button> / <button>-</button>
                </div>
              </li>
              <li><div>Utilize extensões e recursos do navegador para melhor utilizá-lo</div></li>
            </ul>
          </div>
        </div>
        <div id="loginContainer">
          <div className="btnLoginSignInAccess">
            <a tabIndex="1" className="btnAccess" onClick={() => history("/login")}>
              Acessar conta
            </a>
          </div>
          <div className="btnLoginSignInAccess">
            <a tabIndex="1" className="btnAccess" onClick={() => history("/cadastro")}>
              Criar conta
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

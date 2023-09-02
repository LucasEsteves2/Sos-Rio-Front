import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate, Link } from "react-router-dom";
import { useUsuario } from "../../../context/UsuarioContext";
import { useClickObj } from "../../../context/ClickObj";
import AcessibilityLogo from "../../../assets/icons/accessibility.png"
import Logo from "../../../assets/icons/logo.png";
import { Cancel } from "@material-ui/icons"
import MuiAlert from "@material-ui/lab/Alert";
import { TextField, Button, Grid, Snackbar, IconButton, Stack } from "@material-ui/core";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function HeaderAuth() {
  const { obj, setObj } = useClickObj();
  const [open, setOpen] = React.useState(false);
  const history = useNavigate();
  const [usuario, setUsuario] = useState([]);
  const { user, setUser } = useUsuario();
  console.log(usuario.name);
  const [txt, setTxt] = useState("");
  const [alertMensagem, setAlertMensagem] = useState({
    mensagem: null,
    cor: null
  })

  useEffect(() => {
    var adm = localStorage.getItem("usuario");
    setUsuario(JSON.parse(adm));
    console.log(usuario.name);
    var acess = localStorage.getItem("acesso");

    if (acess >= 1) {
      setTxt("PAINEL DE CONTROLE")
    }
  }, [user]);

  function logout() {
    setAlertMensagem({ mensagem: `Bem vindo `, cor: "success" })
    handleClick()
    setUser(1);
    localStorage.clear();
    // history("/");
  }


  const handleClick = () => {
    setOpen(true);
  };


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      <div id="header">
        <div id="headerTitle">
          <button
            id="BtnLogin"
            type="button"
            tabIndex="1"
            onClick={() => setObj({ tipo: "voltar", obj: "" })}
          >
            <img id="logoPARI"src={Logo} alt="Logomarca da plataforma PARI" />
          </button>
          <div id="menuAcessibility">
            <div>
              <img id="logoAcess" src={AcessibilityLogo} alt="Símbolo internacional da acessibilidade" />
            </div>
            <ul tabIndex="-1">
              <li><div>Site Acessível</div></li> 
              <li><div>Utilize extensões e recursos do navegador para melhor utilizá-lo</div></li>
            </ul>
          </div>
        </div>
        <div id="loginContainer">
          <div className="btnLoginSignInAccess" tabindex="0">
            <a tabIndex="1" className="painelAdm" onClick={() => history("/adm")}>{txt}</a>
          </div>
          <div className="btnLoginSignInAccess">
            <a tabIndex="1" className="btnAccess">Bem-vindo, {usuario.name}</a>
          </div>
          <div className="btnLoginSignInAccess" tabindex="0">
            <a tabIndex="1" className="btnAccess" onClick={logout}>
              Desconectar
            </a>
          </div>
        </div>
      </div>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertMensagem.cor} sx={{ width: '100%' }}>
          {alertMensagem.mensagem}
        </Alert>
      </Snackbar>


    </>
  );
}

import "./style.css";
import React, { useEffect, useState } from "react";
import { api } from "../../services/api/index";
import { useNavigate } from "react-router-dom";
import { useAcesso } from "../../context/AdminContext";
import { useUsuario } from "../../context/UsuarioContext";
import {
  Snackbar,
  
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

import MuiAlert from "@material-ui/lab/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
  const history = useNavigate();
    const {user, setUser } = useUsuario();

  const { acesso, setAcesso } = useAcesso();
  const [usuario, setUsuario] = useState({
    email: "",
    senha: "",
  });

  const [alertMensagem, setAlertMensagem] = useState({
    mensagem: null,
    cor: null,
  });
  // useEffect(() => {
  //   let token = localStorage.getItem("token");
  //   if (token) {
  //     history("/")
  //   }
     

  // })

  function cadastro() {
    history("/cadastro");
  }

  async function logar() {
    try {
      var { headers } = await api.post(`/auth/login`, {
        usuario: usuario.email,
        password: usuario.senha,
        confirmPassword: usuario.senha,
      });

      console.log(headers.authorization);
      localStorage.setItem("token", headers.authorization);
      setAcesso(2);
      localStorage.setItem("acesso", 2);
      history("/adm");

    } catch {
      setAlertMensagem({ mensagem: "Usuario Invalido!!", cor: "error" });
      handleClick();
      setUsuario({ email: "", senha: "" });
    }
  }

  async function getUsuario() {
    try {
      var { data } = await api.get(`/usuarios/email?value=${usuario.email}`);

      console.log(data);

      //se for nulo é um usuario
      if (data.acess == null) {
        localStorage.setItem("usuario", JSON.stringify(data));
        localStorage.setItem("acesso", data.acess);
        console.log("Voce se conectou na conta de Cliente");
        setUser(data)
        setAcesso(data.acess);
        history("/");

        // setAcesso(data.acesso);
      } else {
        localStorage.setItem("usuario", JSON.stringify(data));
        localStorage.setItem("acesso", data.acess);
        setUser(data)
        setAcesso(data.acess);
        history("/adm");
        console.log("oi adm")
      }
    } catch {
      alert("deu ruim");
    }
  }

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="login-body">

    <div className="container">
  <div className="screen">
        <div className="screen__content">
          <form className="login" 
          onSubmit={(e) => {
            e.preventDefault();
            console.log(usuario);
            logar();
          }}>
            <div className="login__field">

            <PersonIcon className="login__icon fas fa-user" />
              <input
              className="login__input"
              required // Esta é a parte em que você adiciona 'required'
              placeholder="Usuario"
              value={usuario.email}
              onChange={(e) => {
                setUsuario((prevState) => {
                  return { ...prevState, email: e.target.value };
                });
              }}
            />
            </div>
            <div className="login__field">
              <LockIcon className="login__icon"></LockIcon>
              <input
            required // Esta é a parte em que você adiciona 'required'
              type="password"
              className="login__input"
              value={usuario.senha}
              placeholder="Senha"
              onChange={(e) => {
                setUsuario((prevState) => {
                  return { ...prevState, senha: e.target.value };
                });
              }}
            />
            </div>
            <button className="button login__submit" type="submit">
              <span className="button__text">Entrar</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
          <div className="social-login">
            <h4>Contato</h4>
            <div className="social-icons">
            <a href="#" className="social-login__icon">
        <FontAwesomeIcon icon={faInstagram} />
      </a>
      <a href="#" className="social-login__icon">
        <FontAwesomeIcon icon={faFacebook} />
      </a>
      <a href="#" className="social-login__icon">
        <FontAwesomeIcon icon={faTwitter} />
      </a>
            </div>
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alertMensagem.cor}
          sx={{ width: "100%" }}
        >
          {alertMensagem.mensagem}
        </Alert>
      </Snackbar>
    </div>
    </div>
  );
}

export default Login;

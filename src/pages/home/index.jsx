import React, { useEffect, useState } from "react";
import Header from "../../components/Navbar";
import Body from "../../components/Body";
import Footer from "../../components/Footer";
import "./style.css";
import { HeaderAuth } from "./../../components/Navbar/auth/index";
import { useUsuario } from "../../context/UsuarioContext";

export function Home() {
  const [usuario, setUsuario] = useState(localStorage.getItem("username"));
  const { user, setUser } = useUsuario();

  useEffect(() => {
    setUsuario(localStorage.getItem("usuario"));
    header();
  }, [user]);

  function header() {
    //usuario logado
    if (usuario) {
      return <HeaderAuth />;
    } else {
      return <Header />;
    }
  }

  return (
    <>
      <div id="containerHome">
        {header()}
        <Body />
        <Footer />
      </div>
    </>
  );
}

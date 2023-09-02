import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ApoioMapLayout } from "../components/admin/Layout/ApoioMapLayout";
import { ChartLayout } from "../components/admin/Layout/ChatLayout";
import Layout from "../components/admin/Layout/Layout";
import { ProfileLayout } from "../components/admin/Layout/profileLayout";
import { RiscoMapLayout } from "../components/admin/Layout/RiscoMapLayout";
import { SireneMapLayout } from "../components/admin/Layout/SireneMapLayout";
import { TableLayout } from "../components/admin/Layout/TableLayout";
import FormularioUsuario from "../pages/CadastroUsuario";
import { Pagina404 } from "../pages/error";
import { Home } from "../pages/home";
import Login from "../pages/Login";
import { useAcesso } from "../context/AdminContext";
import { SireneFeedback } from "../pages/admin/Feedback/sirene";
import { SireneFeedbackLayout } from "../components/admin/Layout/SireneFeedbackLayout";
import { PontoApoioFeedbackLayout } from "../components/admin/Layout/PontoApoioFeedbackLayout";
import { ZonaRiscoFeedbackLayout } from './../components/admin/Layout/ZonaRiscoFeedbackLayout';

export default function Rotas() {
  const { acesso, setAcesso } = useAcesso();

  //verificando se admin
  useEffect(() => {
    setAcesso(localStorage.getItem("acesso"));
    console.log("acesso"+acesso);
  }, [acesso]);

  function admAuth() {
    if (acesso>=1) {
      return (
        <>
          <Route exact path="adm/" element={<Layout />} />,
          <Route exact path="adm/dashboard" element={<Layout />} />,
          <Route exact path="adm/tabelas" element={<TableLayout />} />,
          <Route exact path="adm/grafico" element={<ChartLayout />} />,
          <Route exact path="adm/sirene" element={<SireneMapLayout />} />,
          <Route exact path="adm/apoio" element={<ApoioMapLayout />} />,
          <Route exact path="adm/risco" element={<RiscoMapLayout />} />,
          <Route exact path="adm/a" element={<ProfileLayout />} />
          <Route exact path="adm/sirenes/feedback" element={<SireneFeedbackLayout />} />
          <Route exact path="adm/pontosdeapoio/feedback" element={<PontoApoioFeedbackLayout />} />
          <Route exact path="adm/zonasderisco/feedback" element={<ZonaRiscoFeedbackLayout />} />
        </>
      );
    }
  }

  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="*" element={<Pagina404 />} />
      {admAuth()}
    </Routes>
  );
}

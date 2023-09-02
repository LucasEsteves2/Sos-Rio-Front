import React, { useState, useEffect } from "react";
import { Inbox as InboxIcon, LinkOutlined } from "@material-ui/icons";
import {
    Home as HomeIcon,
    NotificationsNone as NotificationsIcon,
    FormatSize as TypographyIcon,
    FilterNone as UIElementsIcon,
    BorderAll as TableIcon,
    QuestionAnswer as SupportIcon,
    LibraryBooks as LibraryIcon,
    HelpOutline as FAQIcon,
    ArrowBack as ArrowBackIcon,
    Room as Marker,
    Map as Mapa,
    Security as Apoio,
    ViewList as Usuarios,
    BarChart as Graficos,
    Warning as Risco,
  } from "@material-ui/icons";

  import Dot from "./components/Dot";

export const structure = [
    { id: 0, label: "Dashboard", link: "/adm/dashboard", icon: <HomeIcon /> },
    {
      id: 1,
      label: "Graficos",
      link: "/adm/grafico",
      icon: <Graficos />,
    },
    { id: 2, label: "Tabelas", link: "/adm/tabelas", icon: <Usuarios /> },
    // {
    //   id: 3,
    //   label: "Notifications",
    //   link: "/app/notifications",
    //   icon: <NotificationsIcon />,
    // },
    // {
    //   id: 4,
    //   label: "UI Elements",
    //   link: "/app/dashboard",
    //   icon: <UIElementsIcon />,
      
    // },
    { id: 5, type: "divider" },
    { id: 6, type: "title", label: "MAPA" , icon: <Mapa />,},
    {
      id: 7,
      label: "Sirene",
      link: "/adm/sirene",
      icon: <Marker />,
    },
    {
      id: 8,
      label: "Zona de risco",
      link: "/adm/risco",
      icon: <Risco />,
    },
    {
      id: 9,
      label: "Ponto de Apoio",
      link: "/adm/apoio",
      icon: <Apoio />,
    },
    { id: 10, type: "divider" },
    { id: 11, type: "title", label: "AVALIAÇÕES" },
    {
      id: 12,
      label: "Ponto de Apoio",
      link: "/adm/pontosdeapoio/feedback",
      icon: <Dot size="small" color="warning" />,
    },
    {
      id: 13,
      label: "Sirene",
      link: "/adm/sirenes/feedback",
      icon: <Dot size="small" color="success" />,
    },
    {
      id: 14,
      label: "Zona de Risco",
      link: "/adm/zonasderisco/feedback",
      icon: <Dot size="small" color="secondary" />,
    },
  ];
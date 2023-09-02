import React, { useEffect, useState } from "react";

import classnames from "classnames";
import { Box, IconButton, Link } from "@material-ui/core";
import Icon from "@mdi/react";

//icons
import {
  mdiFacebook as FacebookIcon,
  mdiTwitter as TwitterIcon,
  mdiGithub as GithubIcon,
} from "@mdi/js";

// styles
import useStyles from "./mapStyle";

// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

// pages

// context
import { useLayoutState } from "../../../context/LayoutContext";

import { useLocation, Routes, Route } from "react-router-dom";
import { ZonaRiscoMap } from '../drawMap/risco';

export function RiscoMapLayout(props) {
  var classes = useStyles();
  const [rotaAtual, setRotaAtual] = useState(useLocation());
  console.log(rotaAtual.pathname);

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
        {/* pega a rota e renderiza o objeto necessario */}
        <ZonaRiscoMap />
       
        </div>
      </>
    </div>
  );
}


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
import useStyles from "./styles";

// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

// pages

// context
import { useLayoutState } from "../../../context/LayoutContext";

import { useLocation, Routes, Route } from "react-router-dom";
import { SireneFeedback } from "../../../pages/admin/Feedback/sirene";

export function SireneFeedbackLayout(props) {
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
        <SireneFeedback />
          <Box
            mt={5}
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent="space-between"
          >
            <div>
            </div>
            {/* REDE SOCIAL */}
            <div>
              <Link
                href={"https://www.facebook.com/uffpetropolis"}
                target={"_blank"}
              >
                <IconButton aria-label="facebook">
                  <Icon path={FacebookIcon} size={1} color="#6E6E6E99" />
                </IconButton>
              </Link>
              <Link href={"https://twitter.com/uff_br"} target={"_blank"}>
                <IconButton aria-label="twitter">
                  <Icon path={TwitterIcon} size={1} color="#6E6E6E99" />
                </IconButton>
              </Link>
              <Link href={"https://github.com/serratec"} target={"_blank"}>
                <IconButton aria-label="github" style={{ marginRight: -12 }}>
                  <Icon path={GithubIcon} size={1} color="#6E6E6E99" />
                </IconButton>
              </Link>
            </div>
          </Box>
        </div>
      </>

      
    </div>
  );
}


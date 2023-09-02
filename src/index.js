import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import Themes from "./themes";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";
import AdminProvider from "./context/AdminContext";
import ClickObjContext from "./context/ClickObj"
import UsuarioContext from "./context/UsuarioContext"
import NavContext from "./context/NavContext";
import FiltroContext from "./context/FiltroContext";
ReactDOM.render(
  <LayoutProvider>
    <UserProvider>
      <ThemeProvider theme={Themes.default}>
        <CssBaseline />
        <UsuarioContext> 
          <AdminProvider>
            <ClickObjContext>
              <NavContext>
                <FiltroContext>  
                <App />
                </FiltroContext>
              </NavContext>
            </ClickObjContext>
          </AdminProvider>
        </UsuarioContext>
      </ThemeProvider>
    </UserProvider>
  </LayoutProvider>,
  document.getElementById("root")
);

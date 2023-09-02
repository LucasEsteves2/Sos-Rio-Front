import React, { useState, createContext, useContext } from "react";

const FiltroContext = createContext();

export default function AdminProvider({ children }) {
  const [filtro, setFiltro] = useState({sirene:true,risco:true,ponto:true});
  return (
    <FiltroContext.Provider value={{ filtro, setFiltro }}>
      {children}
    </FiltroContext.Provider>
  );
}

export function useFiltro() {
  const context = useContext(FiltroContext);
  const { filtro, setFiltro } = context;
  return { filtro, setFiltro };
}

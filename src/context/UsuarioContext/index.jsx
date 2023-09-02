import React, { useState, createContext, useContext } from "react";

const UsuarioContext = createContext();

export default function UsuarioProvider({ children }) {
  const [user, setUser] = useState();
  return (
    <UsuarioContext.Provider value={{ user, setUser }}>
      {children}
    </UsuarioContext.Provider>
  );
}

export function useUsuario() {
  const context = useContext(UsuarioContext);
  const { user, setUser } = context;
  return { user, setUser };
}




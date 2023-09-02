import React, { useState, createContext, useContext } from "react";

const AdminContext = createContext();

export default function AdminProvider({ children }) {
  const [acesso, setAcesso] = useState();
  return (
    <AdminContext.Provider value={{ acesso, setAcesso }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAcesso() {
  const context = useContext(AdminContext);
  const { acesso, setAcesso } = context;
  return { acesso, setAcesso };
}

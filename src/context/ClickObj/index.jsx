import React, { useState, createContext, useContext } from "react";

const ClickObjContext = createContext();

export default function AdminProvider({ children }) {
  const [obj, setObj] = useState("/");
  return (
    <ClickObjContext.Provider value={{ obj, setObj }}>
      {children}
    </ClickObjContext.Provider>
  );
}

export function useClickObj() {
  const context = useContext(ClickObjContext);
  const { obj, setObj } = context;
  return { obj, setObj };
}

import React, { useState, createContext, useContext } from "react";

const NavContext = React.createContext({});

export default function AdminProvider({ children }) {
  const [objSelected, setObjSelected] = useState([]);
  
  return (
    <NavContext.Provider value={{ objSelected, setObjSelected }}>
      {children}
    </NavContext.Provider>
  );
};

export function useNavData() {
  const context = useContext(NavContext);
  const { objSelected, setObjSelected } = context;
  return { objSelected, setObjSelected };
};

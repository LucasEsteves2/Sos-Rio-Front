import { BrowserRouter } from "react-router-dom";
import Rotas from "./routes";
import VLibras from "@djpfs/react-vlibras";
import "./global.css";

function App() {
    return (
        <>
            <VLibras />
            <BrowserRouter>
                <Rotas />
            </BrowserRouter>
        </>
    );
}

export default App;

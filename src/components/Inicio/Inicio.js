import React, { useContext } from "react";
import Presentacion from "./Presentacion";
import { ContextInicio } from "./ContextIncio";
import Resultados from "./Resultados";
import "./styleInicio.scss";
import ModalImg from "./ModalImg";
let estilosSections = {
    padding: "1rem 0",
    backgroundColor: "#1a1c24",
};

const Inicio = () => {
    const { resultados, modal } = useContext(ContextInicio);

    return (
        <>
            <Presentacion estilosSections={estilosSections} />
            {resultados && <Resultados estilosSections={estilosSections} />}
            {modal && <ModalImg />}
        </>
    );
};

export default Inicio;

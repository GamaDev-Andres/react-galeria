import React from "react";
import Presentacion from "./Presentacion";
import ContextIncioProvider from "./ContextIncio";
import Resultados from "./Resultados";
import "./styleInicio.scss";
let estilosSections = {
    padding: "1rem 0",
    backgroundColor: "#cadffb",
};
// const apiKey = "20184489-7f6952a13cf5ddb9d367f5d16";

const Inicio = () => {
    return (
        <>
            <ContextIncioProvider>
                <Presentacion estilosSections={estilosSections} />
                <Resultados estilosSections={estilosSections} />
            </ContextIncioProvider>
        </>
    );
};

export default Inicio;

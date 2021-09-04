import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const ContextInicio = createContext();
const ContextIncioProvider = ({ children }) => {
    const [busqueda, setBusqueda] = useState("");
    const [resultados, setResultados] = useState(null);
    const [url, setUrl] = useState(null);
    const [paginaActual, setPaginaActual] = useState(1);
    const [modal, setModal] = useState(null);
    useEffect(() => {
        if (modal) {
        }
    }, [modal]);

    useEffect(() => {
        if (busqueda.trim() !== "") {
            const consultaApi = async () => {
                let urlFinal =
                    url ||
                    `https://pixabay.com/api/?key=20184489-7f6952a13cf5ddb9d367f5d16&q=${busqueda}&lang=es`;
                const resultados = await axios.get(urlFinal);
                setResultados(resultados.data);
            };
            consultaApi();
        }
    }, [busqueda, url]);

    return (
        <ContextInicio.Provider
            value={{
                modal,
                setModal,
                paginaActual,
                busqueda,
                setPaginaActual,
                setUrl,
                setBusqueda,
                resultados,
            }}
        >
            {children}
        </ContextInicio.Provider>
    );
};

export default ContextIncioProvider;

import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export const ContextInicio = createContext();
const initialDataAlbumes = [
    {
        nameAlbum: "Pixaby",
        descripcion: "Fotos favoritas escogidas de la pagina de inicio",
        id: "pixaby",
    },
];
const ContextIncioProvider = ({ children }) => {
    const [busqueda, setBusqueda] = useState("");
    const [resultados, setResultados] = useState(null);
    const [url, setUrl] = useState(null);
    const [paginaActual, setPaginaActual] = useState(1);
    const [modal, setModal] = useState({ inicio: "", galeria: "" });
    const [formAlbum, setFormAlbum] = useState(null);
    const [albumes, setAlbumes] = useState(initialDataAlbumes);
    const [fotosPixaby, setFotosPixaby] = useState([]);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (usuario) => {
            if (usuario) {
                setUser(usuario);
                console.log(usuario);
            }
        });
    }, []);
    useEffect(() => {
        if (formAlbum) {
            setAlbumes([...albumes, formAlbum]);
        }
    }, [formAlbum]);

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
                setFormAlbum,
                formAlbum,
                albumes,
                setAlbumes,
                setFotosPixaby,
                fotosPixaby,
                setUser,
                user,
            }}
        >
            {children}
        </ContextInicio.Provider>
    );
};

export default ContextIncioProvider;

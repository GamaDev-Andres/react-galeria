import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../environment/evironment";
import useFirebase from "../hooks/useFirebase";

export const ContextInicio = createContext();

const ContextIncioProvider = ({ children }) => {
    //estado que maneja la busqueda en pag inicio
    const [busqueda, setBusqueda] = useState("");
    //estado que maneja los resultados de la busqueda
    const [resultados, setResultados] = useState(null);
    //estado que maneja la url de consulta a la api
    const [url, setUrl] = useState(null);
    //estado que maneja paginacion en Resultados
    const [paginaActual, setPaginaActual] = useState(1);
    //estado que maneja el modal en toda la app
    const [modal, setModal] = useState({ inicio: "", galeria: "" });
    //estado que maneja el formulario de la creacion del album
    const [formAlbum, setFormAlbum] = useState(null);
    //estado que maneja todos los albums de la app
    const [albumes, setAlbumes] = useState(null);
    //estado que maneja unicamente las fotos del album de pixaby
    const [fotosPixaby, setFotosPixaby] = useState([]);
    //estado que maneja el la conexion de usuario , validando si inicio sesion o no
    const [user, setUser] = useState(null);

    const { createDoc, createAlbum } = useFirebase();

    //useeffect que obtiene los albums del usuario
    useEffect(() => {
        const obteniendoData = async () => {
            if (user) {
                const docRef = doc(db, "usuarios", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    const datosDb = docSnap.data();
                    let albumsObjToArr = [];
                    for (const album in datosDb) {
                        const element = datosDb[album];
                        albumsObjToArr.push(element);
                    }

                    setAlbumes(albumsObjToArr);
                } else {
                    console.log("No such document!");
                    createDoc(user);
                    obteniendoData();
                }
            }
        };
        obteniendoData();
    }, [user]);
    //useeffect que observa el estado del usuario
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (usuario) => {
            if (usuario) {
                setUser(usuario);
            }
        });
    }, []);
    //useeffect que controla la creacion y agregacion de albums
    useEffect(() => {
        if (formAlbum) {
            setAlbumes([...albumes, formAlbum]);
            createAlbum(user, albumes, formAlbum);
            // updateDocument(user, formAlbum, false);
        }
    }, [formAlbum]);
    //useeffect que controla las consultas a la API de pixaby
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

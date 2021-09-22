import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ContextInicio } from "../ContextIncio";
import Foto from "./Foto";
import { v4 as uuidv4 } from "uuid";
import TomarFoto from "./TomarFoto";
import useFirebase from "../../hooks/useFirebase";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { storage } from "../../environment/evironment";
import Spinner from "./Spinner";

const H3 = styled.h3`
    text-align: start;
    margin-top: 0;
`;
const Container = styled.div`
    background-color: #5d5e76;
    &:nth-child(2n + 1) {
        background-color: #393b4a;
    }
    width: 100%;
    padding: 1rem 0;
    .sub-container-album {
        margin: 0 auto;
        width: 90%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
`;
const DivButtons = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
`;
const ContainerFotos = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(auto, 200px);
    gap: 10px;
    padding: 1rem 0;
    @media (max-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 480px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;
const DivInputFile = styled.div`
    position: relative;
    display: inline-block;
    /* &:hover {
    } */
    border-radius: 5px;
    &::before {
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        content: "Agregar Foto";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

        border: none;
        padding: 0.5rem 1rem;
        box-shadow: none;
        cursor: pointer;
        background-color: #8686a6;
        font-weight: 700;
        font-size: 1rem;
        color: #e2e2e2;
    }
    &:hover {
        transition: all 0.3s ease;
        box-shadow: 1px 1px 3px #e2e2e2, -1px -1px 3px #e2e2e2;
        &::before {
            color: #bdbaba;
            background-color: #5d5e76;
        }
    }

    input {
        cursor: pointer;
        opacity: 0;
        width: 200px;
        height: 32px;
        display: block;
        &:hover {
            color: #bdbaba;
            transition: all 0.3s ease;
            background-color: #5d5e76;
            box-shadow: 1px 1px 3px #e2e2e2, -1px -1px 3px #e2e2e2;
        }
    }

    /* &::before {
        content: "Seleccionar Archivo 1";
    } */
`;
const Album = ({ datos, setAlbumes }) => {
    const { user, albumes } = useContext(ContextInicio);
    const [verMas, setVerMas] = useState(null);
    const [spinner, setSpinner] = useState(false);
    const [arrFotos, setArrFotos] = useState(datos.fotos);
    const [tomandoFoto, setTomandoFoto] = useState(false);
    const { updateDocument, deleteCampoFireStore } = useFirebase();
    const handleDelete = () => {
        let newAlbums = albumes.filter((album) => album.id !== datos.id);
        setAlbumes(newAlbums);
        const id = user.uid;
        deleteCampoFireStore(id, datos.nameAlbum);
    };

    useEffect(() => {
        if (arrFotos.length > 8) {
            setVerMas(false);
        }

        updateDocument(user, arrFotos, datos);
        let newAlbumes = albumes.map((album) =>
            album.id === datos.id ? { ...album, fotos: arrFotos } : album
        );
        setAlbumes(newAlbumes);
    }, [arrFotos]);

    //funcion encargada de manejo de archivos del input type file
    const handleChange = (e) => {
        console.log("hola");
        const inputFiles = e.target.files;
        //itero los archivos los leo y les asigno evento y actualizo las fotos
        for (const file of inputFiles) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener("load", (e) => {
                const data = e.currentTarget.result;
                console.log(data);
                let idFoto = uuidv4();
                const imagesRef = ref(storage, `imagenes-galeria/${idFoto}`);
                setSpinner(true);
                uploadString(imagesRef, data, "data_url").then((snapshot) => {
                    console.log("archivo cargado");
                    console.log(snapshot);
                    getDownloadURL(imagesRef).then((rta) => {
                        console.log("URL DE LA FOTO ", rta);
                        setArrFotos([...arrFotos, { data: rta, id: idFoto }]);
                        setSpinner(false);
                    });
                });
                // setArrFotos([...arrFotos, { data, id: uuidv4() }]);
            });
        }
    };
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", (e) => {
            let data = e.currentTarget.result;
            let idFoto = uuidv4();
            const imagesRef = ref(storage, `imagenes-galeria/${idFoto}`);
            setSpinner(true);
            uploadString(imagesRef, data, "data_url").then((snapshot) => {
                console.log("archivo cargado");
                console.log(snapshot);
                getDownloadURL(imagesRef).then((rta) => {
                    console.log("URL DE LA FOTO ", rta);
                    setArrFotos([...arrFotos, { data: rta, id: idFoto }]);
                    setSpinner(false);
                });
            });
        });
    };
    return (
        <>
            {spinner && <Spinner />}
            <Container id={datos.id} className="album">
                {tomandoFoto && (
                    <TomarFoto
                        arrFotos={arrFotos}
                        idAlbum={datos.id}
                        setArrFotos={setArrFotos}
                        setTomandoFoto={setTomandoFoto}
                    />
                )}
                <div className="sub-container-album">
                    <H3>Album : {datos.nameAlbum}</H3>
                    <p>{datos.descripcion}</p>
                    <DivButtons>
                        <button
                            className="btn tomar"
                            onClick={() => setTomandoFoto(true)}
                        >
                            Tomar foto
                        </button>

                        <DivInputFile className="file-select" id="add-file">
                            <input
                                onChange={handleChange}
                                type="file"
                                accept="image/jpg,image/jpeg,image/png"
                                aria-label="Archivo"
                            />
                        </DivInputFile>
                        <button className="btn delete" onClick={handleDelete}>
                            Eliminar album
                        </button>
                    </DivButtons>
                    <ContainerFotos
                        onDrop={handleDrop}
                        onDragOver={(e) => {
                            e.preventDefault();
                        }}
                    >
                        {arrFotos.length > 0 &&
                            (verMas ? arrFotos : arrFotos.slice(0, 8)).map(
                                (foto) => (
                                    <Foto
                                        key={uuidv4()}
                                        src={foto}
                                        datos={{
                                            arr: arrFotos,
                                            set: setArrFotos,
                                        }}
                                        nameAlbum={datos.nameAlbum}
                                    />
                                )
                            )}
                    </ContainerFotos>
                    {!verMas && arrFotos.length > 8 && (
                        <button onClick={() => setVerMas(true)}>ver mas</button>
                    )}
                    {verMas && (
                        <button onClick={() => setVerMas(false)}>
                            ver menos
                        </button>
                    )}
                </div>
            </Container>
        </>
    );
};

export default Album;

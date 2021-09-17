import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ContextInicio } from "../ContextIncio";
import Foto from "./Foto";
import { v4 as uuidv4 } from "uuid";
import TomarFoto from "./TomarFoto";
import useFirebase from "../../hooks/useFirebase";

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

const Album = ({ datos, setAlbumes, albumes }) => {
    const { user } = useContext(ContextInicio);
    const [verMas, setVerMas] = useState(null);
    console.log("Datos fotos");
    console.log(datos.fotos);
    const [arrFotos, setArrFotos] = useState(datos.fotos);
    const [tomandoFoto, setTomandoFoto] = useState(false);
    const { updateDocument } = useFirebase();
    const handleDelete = () => {
        let newAlbums = albumes.filter((album) => album.id !== datos.id);
        setAlbumes(newAlbums);
    };

    useEffect(() => {
        if (arrFotos.length > 8) {
            setVerMas(false);
        }
        let newAlbums = albumes.map((album) =>
            album.id !== datos.id ? album : { ...album, fotos: arrFotos }
        );
        console.log("cambios en arr fotos-newalbums");
        console.log(newAlbums);
        updateDocument(user, arrFotos, datos);
        let newAlbumes = albumes.map((album) =>
            album.id === datos.id ? { ...album, fotos: arrFotos } : album
        );
        setAlbumes(newAlbumes);
    }, [arrFotos]);

    return (
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
                    <button className="btn add">Agregar foto</button>
                    <button className="btn delete" onClick={handleDelete}>
                        Eliminar album
                    </button>
                    <button className="btn rename">Renombrar album</button>
                </DivButtons>
                <ContainerFotos>
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
                    <button onClick={() => setVerMas(false)}>ver menos</button>
                )}
            </div>
        </Container>
    );
};

export default Album;

import React from "react";
import styled from "styled-components";
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
    @media (max-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 480px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;
const Album = ({ datos, setAlbumes, albumes }) => {
    const handleDelete = () => {
        let newAlbums = albumes.filter(
            (album) => album.nameAlbum !== datos.nameAlbum
        );
        setAlbumes(newAlbums);
    };
    return (
        <Container id={datos.nameAlbum} className="album">
            <div className="sub-container-album">
                <H3>Album :{datos.nameAlbum}</H3>
                <p>{datos.descripcion}</p>
                <DivButtons>
                    <button className="btn tomar">Tomar foto</button>
                    <button className="btn add">Agregar foto</button>
                    <button className="btn delete" onClick={handleDelete}>
                        Eliminar album
                    </button>
                    <button className="btn rename">Renombrar album</button>
                </DivButtons>
                <ContainerFotos></ContainerFotos>
            </div>
        </Container>
    );
};

export default Album;

import React, { useContext } from "react";
import styled from "styled-components";
import { ContextInicio } from "../Inicio/ContextIncio";
import Album from "./Album";
const AlbumsContainer = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const Albums = () => {
    const { albumes, setAlbumes } = useContext(ContextInicio);

    return (
        <AlbumsContainer id="albums">
            {albumes.map((album) => (
                <Album
                    datos={album}
                    setAlbumes={setAlbumes}
                    albumes={albumes}
                    key={album.id}
                />
            ))}
        </AlbumsContainer>
    );
};

export default Albums;

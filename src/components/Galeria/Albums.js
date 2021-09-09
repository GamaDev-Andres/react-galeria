import React from "react";
import styled from "styled-components";
import Album from "./Album";
const AlbumsContainer = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const Albums = () => {
    return (
        <AlbumsContainer id="albums">
            <Album id="album-pixaby" />
        </AlbumsContainer>
    );
};

export default Albums;

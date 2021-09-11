import React from "react";
import styled from "styled-components";
const Div = styled.div`
    width: 100%;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
const Foto = ({ src, nameAlbum }) => {
    return (
        <Div>
            <img src={src} alt={"foto album de " + nameAlbum} />
        </Div>
    );
};

export default Foto;

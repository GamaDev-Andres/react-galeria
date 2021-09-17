import React, { useContext } from "react";
import styled from "styled-components";

import { ContextInicio } from "../ContextIncio";
import Album from "./Album";
const AlbumsContainer = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const Albums = () => {
    // const [tomandoFoto, setTomandoFoto] = useState(false);
    const { albumes, setAlbumes } = useContext(ContextInicio);

    return (
        <AlbumsContainer id="albums">
            {albumes.map((album) => (
                <Album
                    // setTomandoFoto={setTomandoFoto}
                    datos={album}
                    setAlbumes={setAlbumes}
                    albumes={albumes}
                    key={album.id}
                />
            ))}
            {/* {tomandoFoto && <TomarFoto setTomandoFoto={setTomandoFoto} />} */}
        </AlbumsContainer>
    );
};

export default Albums;

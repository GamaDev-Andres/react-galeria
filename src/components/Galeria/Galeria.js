import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ContextInicio } from "../ContextIncio";
import ModalImg from "../Inicio/ModalImg";
import Albums from "./Albums";
const Presentacion = styled.section`
    width: 100%;
    background-color: #1a1c24;
    padding: 1rem 0;
`;
const SubContenedor = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 90%;
    a {
        color: #e2e2e2;
        display: block;
        border-radius: 5px;
        padding: 0.5rem 1rem;
        background-color: #8686a6;
        font-weight: 700;
        font-size: 1rem;
        text-decoration: none;

        &:hover {
            color: #bdbaba;
            transition: all 0.3s ease;
            background-color: #5d5e76;
            box-shadow: 1px 1px 3px #e2e2e2, -1px -1px 3px #e2e2e2;
        }
    }
`;

const Galeria = () => {
    const { modal } = useContext(ContextInicio);
    return (
        <>
            <Presentacion id="presentacion">
                <SubContenedor>
                    <h2>Galeria</h2>
                    <p>
                        En esta seccion podras encontrar tus albums, en caso de
                        no tener uno podras crearlo o si tienes uno, eliminarlo
                        tambien sera posible que agregues archivos desde tu
                        dispositivo o podras arrastrarlo al album que escojas.
                        tendras un limite de fotos para cada album, recordar que
                        este proyecto tiene una intencion completamente practica
                        en donde su objetivo principal es agregar diferentes
                        funcionalidades asemejando un proyecto producto real.
                    </p>
                    <Link exact="true" to="/creacion-album">
                        Crear album
                    </Link>
                </SubContenedor>
            </Presentacion>
            <Albums />
            {modal.galeria && <ModalImg pagina="galeria" />}
        </>
    );
};

export default Galeria;

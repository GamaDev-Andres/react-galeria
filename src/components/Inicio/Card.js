import React from "react";
import styled from "styled-components";

const Contenedor = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    &:hover {
        div {
            transform: translateY(0%);
            opacity: 1;
            transition: all 0.5s ease;
            visibility: visible;
        }
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: 100% 100%;
    }
`;
const DivButtons = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-100%);
    transition: all 0.5s ease;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
`;
const Button = styled.button`
    cursor: pointer;
    padding: 8px;
    box-shadow: none;
    border: none;
    border-radius: 5px;
    background-color: #002973;
    color: white;
    &:hover {
        background-color: #012363;
        color: #ccc;
    }
`;
const Card = ({ foto }) => {
    return (
        <Contenedor className="card">
            <DivButtons>
                <Button>Ver</Button>
                <Button>Agregar</Button>
            </DivButtons>
            <img src={foto.previewURL} alt={foto.tags} />
        </Contenedor>
    );
};

export default Card;

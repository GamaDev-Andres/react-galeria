import React, { useContext } from "react";
import styled from "styled-components";
import { ContextInicio } from "../ContextIncio";
const Div = styled.div`
    position: relative;

    width: 100%;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    &:hover {
        div {
            transform: translateY(0%);
            opacity: 1;
            transition: all 0.5s ease;
            visibility: visible;
        }
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
const Foto = ({ src, nameAlbum, datos }) => {
    const { setModal } = useContext(ContextInicio);
    const handleClick = () => {
        setModal({ galeria: src.grande || src.data, inicio: "" });
    };
    const handleDelete = () => {
        let newFotos = datos.arr.filter((objFoto) => objFoto.id !== src.id);
        datos.set(newFotos);
    };
    return (
        <Div>
            <DivButtons>
                <Button onClick={handleClick}>Ver</Button>
                <Button onClick={handleDelete}>Eliminar</Button>
            </DivButtons>
            <img
                src={src.normal || src.data}
                alt={"foto album de " + nameAlbum}
            />
        </Div>
    );
};

export default Foto;

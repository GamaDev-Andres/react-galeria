import React, { useContext } from "react";
import styled from "styled-components";
import { ContextInicio } from "./ContextIncio";
const Modal = styled.div`
    z-index: 99;
    position: fixed;
    top: 0;

    width: 100%;
    height: 100vh;

    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    flex-direction: column;
    img {
        max-width: 100%;
    }
`;
const Button = styled.button`
    padding: 8px;
    background-color: transparent;
    border: none;
    box-shadow: none;
    color: white;
    font-size: 1.5rem;
    &:hover {
        color: #ccc;
    }
`;
const ModalImg = () => {
    const { setModal, modal, busqueda } = useContext(ContextInicio);

    return (
        <Modal onClick={() => setModal("")}>
            <Button onClick={() => setModal("")}>
                <i className="fas fa-times-circle"></i>
            </Button>
            <img src={modal} alt={"imagen de " + busqueda} />
        </Modal>
    );
};

export default ModalImg;

import React, { useContext } from "react";
import styled from "styled-components";
import { ContextInicio } from "../ContextIncio";

const Img = styled.img`
    max-width: 100%;
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
const ModalImg = ({ pagina }) => {
    const { setModal, modal } = useContext(ContextInicio);

    return (
        <div className="modal" onClick={() => setModal("")}>
            <Button onClick={() => setModal("")}>
                <i className="fas fa-times-circle"></i>
            </Button>
            <Img src={modal[pagina]} alt="imagen" />
        </div>
    );
};

export default ModalImg;

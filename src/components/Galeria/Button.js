import React from "react";
import styled from "styled-components";

const Buttom = styled.button`
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    box-shadow: none;
    cursor: pointer;
    background-color: #8686a6;
    font-weight: 700;
    font-size: 1rem;
    color: #e2e2e2;
    &:hover {
        color: #bdbaba;
        transition: all 0.3s ease;
        background-color: #5d5e76;
        box-shadow: 1px 1px 3px #e2e2e2, -1px -1px 3px #e2e2e2;
    }
`;
const Button = () => {
    return <Buttom></Buttom>;
};

export default Button;

import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
//CREACION Y ESTILOS NAV
const Nav = styled.nav`
    position: sticky;
    bottom: 0;
    z-index: 9;
    min-width: 100%;
    height: 45px;
    background-color: #fff;
    border-top: 1px solid #bdbdbdcc;
    box-shadow: 2px 0px 0px grey;
    display: none;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
        display: flex;
    }
    &:hover {
        background-color: #ccc;
        a {
            color: #585858;
        }
    }
    a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        text-align: center;
        color: grey;
        font-size: 1.2rem;

        &:first-of-type {
            border-right: 2px solid black;
        }
        &.active {
            background-color: #cadffb;
            border-bottom: none;
        }
    }
`;
const MenuResponsive = () => {
    return (
        <Nav id="nav-down">
            <NavLink exact to="/" activeClassName="active">
                <i className="fas fa-home"></i>
            </NavLink>
            <NavLink exact to="/galeria" activeClassName="active">
                <i className="fas fa-images"></i>
            </NavLink>
        </Nav>
    );
};

export default MenuResponsive;

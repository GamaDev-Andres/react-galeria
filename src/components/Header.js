import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const H1 = styled.h1`
    margin: 0;
    text-align: center;
    color: white;
    font-size: 2rem;
`;
const Nav = styled.nav`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 2rem;
`;

const Header = () => {
    return (
        <header className="header">
            <Nav>
                <NavLink
                    className="navLinks"
                    exact
                    to="/"
                    activeClassName="active"
                >
                    Inicio
                </NavLink>
                <H1>Mis Fotos</H1>
                <NavLink
                    className="navLinks"
                    exact
                    to="/galeria"
                    activeClassName="active"
                >
                    Galeria
                </NavLink>
            </Nav>
        </header>
    );
};

export default Header;

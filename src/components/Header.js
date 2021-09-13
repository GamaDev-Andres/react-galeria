import React, { useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { ContextInicio } from "../components/Inicio/ContextIncio";

const H1 = styled.h1`
    margin: 0;
    text-align: center;
    color: #e2e2e2;
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
    const { user, setUser } = useContext(ContextInicio);
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (usuario) => {
            if (usuario) {
                setUser(usuario);
                console.log(usuario);
            }
        });
    }, []);

    const cerrarSesion = () => {
        const auth = getAuth();
        signOut(auth)
            .then((res) => {
                console.log(res);
                setUser(null);
            })
            .catch((err) => {
                console.log(err);
            });
    };
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
                {user ? (
                    <NavLink
                        className="enlaces-sesion cerrar"
                        onClick={cerrarSesion}
                        exact
                        to="/login"
                    >
                        Cerrar sesion
                    </NavLink>
                ) : (
                    <NavLink
                        className="enlaces-sesion inicio"
                        exact
                        to="/login"
                    >
                        Iniciar sesion
                    </NavLink>
                )}
            </Nav>
        </header>
    );
};

export default Header;

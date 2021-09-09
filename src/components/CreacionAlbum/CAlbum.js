import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ContextInicio } from "../Inicio/ContextIncio";
const Container = styled.main`
    width: 100%;
    height: 100vh;
    background-color: #393b4a;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
        margin: 0 auto;
        width: 600px;
        background-color: #1a1c24;
        padding: 1rem;
        border-radius: 1rem;
        form {
            display: flex;
            flex-direction: column;
            input,
            textarea {
                padding: 10px;
                border-radius: 5px;
                outline: none;
                margin: 10px 0;
            }
        }
        @media (max-width: 768px) {
            width: 90%;
        }
    }
`;
const Input = styled.input`
    padding: 10px;
    border-radius: 5px;
    outline: none;
    margin: 10px 0;
`;

const initialDataForm = {
    nameAlbum: "",
    descripcion: "",
};
const Error = styled.p`
    padding: 1rem;
    font-size: 1.2rem;
    font-weight: bold;
    background-color: red;
    color: #e2e2e2;
    text-align: center;
`;
const CAlbum = () => {
    const [form, setForm] = useState(initialDataForm);
    const [error, setError] = useState(false);
    const { setFormAlbum, formAlbum } = useContext(ContextInicio);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleClick = () => {
        if (!form.descripcion || !form.nameAlbum) {
            setError(true);
        }
        setError(false);
        setFormAlbum(form);
        setForm(initialDataForm);
        // window.location.pathname = "/galeria";
    };
    return (
        <Container>
            <div>
                <button
                    onClick={() => {
                        window.location.pathname = "/galeria";
                    }}
                >
                    Volver
                </button>
                <h2>Crea tu album</h2>
                <form>
                    <label htmlFor="name-album">Nombre del album</label>
                    <Input
                        onChange={handleChange}
                        value={form.nameAlbum}
                        name="nameAlbum"
                        id="name-album"
                        type="text"
                        placeholder="Nombre del album"
                    />
                    <label htmlFor="descripcion-album">
                        Descripcion del album
                    </label>
                    <textarea
                        onChange={handleChange}
                        value={form.descripcion}
                        placeholder="Descripcion del album"
                        name="descripcion"
                        id="descripcion-album"
                        cols="30"
                        rows="5"
                        maxLength="100"
                    ></textarea>
                    <Link onClick={handleClick} exact to="/galeria">
                        Crear
                    </Link>
                    {error && <Error>Todos los campos son obligatorios</Error>}
                </form>
            </div>
        </Container>
    );
};

export default CAlbum;

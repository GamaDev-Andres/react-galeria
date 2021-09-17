import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ContextInicio } from "../ContextIncio";
import { v4 as uuidv4 } from "uuid";
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
        a {
            color: #e2e2e2;
            display: inline-block;
            border-radius: 5px;
            padding: 0.5rem 1rem;
            background-color: #8686a6;
            font-weight: 700;
            font-size: 1rem;
            color: #e2e2e2;
            text-decoration: none;

            &:hover {
                color: #bdbaba;
                transition: all 0.3s ease;
                background-color: #5d5e76;
                box-shadow: 1px 1px 3px #e2e2e2, -1px -1px 3px #e2e2e2;
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

const Error = styled.p`
    padding: 1rem;
    font-size: 1.2rem;
    font-weight: bold;
    background-color: red;
    color: #e2e2e2;
    text-align: center;
`;
const Mensaje = styled(Error)`
    background-color: #0afc0a;
`;
const initialDataForm = {
    nameAlbum: "",
    descripcion: "",
    fotos: [],
    id: null,
};
const CAlbum = () => {
    const [form, setForm] = useState(initialDataForm);
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState(false);
    const { setFormAlbum, albumes } = useContext(ContextInicio);
    //me evita errores , al salir del componente sin esperar el setimeout del mensaje
    useEffect(() => {
        return () => {
            setForm(null);
        };
    }, []);
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
            fotos: [],
            id: uuidv4(),
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.descripcion || !form.nameAlbum) {
            setError("todos los campos son obligatorios");
            setTimeout(() => {
                setError(false);
            }, 3000);
            return;
        }
        if (albumes.some((album) => album.nameAlbum === form.nameAlbum)) {
            setError("Ya existe el nombre del album.");
            return;
        }
        setError(false);
        setFormAlbum(form);
        setForm(initialDataForm);
        setMensaje(true);
        setTimeout(() => {
            setMensaje(false);
        }, 3000);
    };
    return (
        <Container>
            <div>
                <Link exact="true" to="/galeria">
                    Volver
                </Link>
                <h2>Crea tu album</h2>
                {mensaje && <Mensaje>Se ha creado correctamente</Mensaje>}
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
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="btn"
                    >
                        Crear
                    </button>

                    {error && <Error>{error}</Error>}
                </form>
            </div>
        </Container>
    );
};

export default CAlbum;

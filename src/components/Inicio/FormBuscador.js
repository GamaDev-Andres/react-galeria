import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ContextInicio } from "../ContextIncio";
const InputBuscador = styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    &:focus {
        border: 1px solid blue;
    }
`;
const DivBuscador = styled.div`
    min-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const FormBuscador = () => {
    //VARIABLE DE ESTADO PARA EL INPUT BUSCADOR
    const [buscador, setBuscador] = useState("");
    //FUNCION ACTUALIZADORA DEL CONTEXO DE INICIO , ACTUALIZA LA BUSQUEDA
    const { setBusqueda, setUrl, setPaginaActual } = useContext(ContextInicio);
    //VALIDA VALOR DEL INPUT BUSCADOR , ACTUALIZA LA BUSQUEDA Y RESETEA EL INPUT
    const handleSubmit = (e) => {
        e.preventDefault();
        if (buscador.trim() === "") return;
        setBusqueda(buscador);
        setPaginaActual(1);
        setUrl(null);
        setBuscador("");
    };
    return (
        <DivBuscador className="div-buscador">
            <form onSubmit={handleSubmit} id="form-buscador">
                <h2>Realiza tu Busqueda</h2>
                <div className="contenedor-input">
                    <InputBuscador
                        value={buscador}
                        onChange={(e) => setBuscador(e.target.value)}
                        type="search"
                        placeholder="Busca tus imagenes..."
                    />
                </div>
                <button type="submit">Buscar</button>
            </form>
        </DivBuscador>
    );
};

export default FormBuscador;

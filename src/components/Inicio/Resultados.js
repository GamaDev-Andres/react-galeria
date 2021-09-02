import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import { ContextInicio } from "./ContextIncio";
const SubContenedor = styled.div`
    margin: 0 auto;
    width: 90%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    grid-auto-rows: minmax(100px, 200px);
`;
const Alerta = styled.p`
    margin: 0 auto;
    padding: 1rem;
    background-color: red;
    color: black;
    display: block;
    width: 50%;
    border-radius: 10px;
    font-weight: 800;
    font-size: 1.2rem;
    text-align: center;
`;
const Button = styled.button`
    cursor: pointer;
    padding: 10px;
    box-shadow: none;
    border: none;
    border-radius: 20px;
    background-color: #002973;
    color: white;
    &:hover {
        background-color: #012363;
        color: #ccc;
    }
`;
const DivButtons = styled.div`
    padding: 1rem 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;
const Resultados = ({ estilosSections }) => {
    const [totalPaginas, setTotalPaginas] = useState(null);
    const { setUrl, resultados, busqueda, paginaActual, setPaginaActual } =
        useContext(ContextInicio);
    useEffect(() => {
        if (resultados) {
            setTotalPaginas(resultados.totalHits);
        }
    }, [resultados]);
    const handleClick = (e) => {
        if (e.target.textContent === "Anterior") {
            setPaginaActual(paginaActual - 1);
            setUrl(
                `https://pixabay.com/api/?key=20184489-7f6952a13cf5ddb9d367f5d16&q=${busqueda}&lang=es&page=${
                    paginaActual - 1
                }`
            );
        } else {
            setPaginaActual(paginaActual + 1);
            setUrl(
                `https://pixabay.com/api/?key=20184489-7f6952a13cf5ddb9d367f5d16&q=${busqueda}&lang=es&page=${
                    paginaActual + 1
                }`
            );
        }
    };
    return (
        <section style={estilosSections}>
            <h2>{busqueda && `Resultados de ${busqueda}`}</h2>
            {resultados &&
                (resultados.total === 0 ? (
                    <Alerta>No hay resultados de {busqueda}</Alerta>
                ) : (
                    <>
                        <SubContenedor>
                            {resultados.hits.map((foto) => (
                                <Card key={foto.id} foto={foto} />
                            ))}
                        </SubContenedor>
                        <DivButtons>
                            {paginaActual !== 1 && (
                                <Button onClick={handleClick}>Anterior</Button>
                            )}
                            {totalPaginas / 20 !== paginaActual && (
                                <Button onClick={handleClick}>Siguiente</Button>
                            )}
                        </DivButtons>
                    </>
                ))}
        </section>
    );
};

export default Resultados;

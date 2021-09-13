import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import { ContextInicio } from "./ContextIncio";
const SubContenedor = styled.div`
    margin: 0 auto;
    width: 90%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(auto, 200px);
    gap: 10px;
    @media (max-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 480px) {
        grid-template-columns: repeat(2, 1fr);
    }
    /* grid-auto-rows: minmax(100px, 200px); */
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
const Span = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
`;
const Resultados = ({ estilosSections }) => {
    const [totalPaginas, setTotalPaginas] = useState(null);
    const { setUrl, resultados, busqueda, paginaActual, setPaginaActual } =
        useContext(ContextInicio);

    useEffect(() => {
        if (resultados) {
            setTotalPaginas(Math.ceil(resultados.totalHits / 20));
            const $resultados = document.querySelector("#resultados");
            $resultados.scrollIntoView({ behavior: "smooth" });
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
        const resultados = document.querySelector("#resultados");
        let optionsIntoView = {
            behavior: "smooth",
        };
        resultados.scrollIntoView(optionsIntoView);
    };
    return (
        <section id="resultados" style={estilosSections}>
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

                            {totalPaginas !== paginaActual && (
                                <Button onClick={handleClick}>Siguiente</Button>
                            )}
                        </DivButtons>
                        <Span className="span-paginas">
                            pagina {paginaActual} de {totalPaginas}
                        </Span>
                    </>
                ))}
        </section>
    );
};

export default Resultados;

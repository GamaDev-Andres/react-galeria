import React from "react";
import styled from "styled-components";
import FormBuscador from "./FormBuscador";
const SubContenedor = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin: 0 auto;
    width: 90%;
    color: #e2e2e2;
    @media (max-width: 780px) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
    }
`;
const Section = styled.section`
    min-height: calc(100vh - 70px);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Presentacion = ({ estilosSections }) => {
    return (
        <Section style={estilosSections} className="contenedor-presentacion">
            <SubContenedor className="sub-contenedor-inicio">
                <div className="descripcion">
                    <h2>Bienvenido a MisFotos</h2>
                    <p>
                        En esta pagina podras realizar busquedas de tus imagenes
                        favoritas y agregarlas a tu album de imagenes y tambien
                        si lo deseas podras subir imagenes de tu dispositivo a
                        este sitio y tenerlas guardadas, tambien sera posible
                        crear albums o tomarte fotos directamente. El proposito
                        de este sitio no es nada productivo , este sitio fue
                        hecho simplemente con un proposito practico.
                    </p>
                </div>
                <FormBuscador />
            </SubContenedor>
        </Section>
    );
};

export default Presentacion;

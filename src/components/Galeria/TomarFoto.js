import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { ContextInicio } from "../Inicio/ContextIncio";

const Video = styled.video`
    @media (max-width: 768px) {
        width: 90%;
        height: auto;
    }
`;

const Div = styled.div`
    width: 600px;
    img {
        width: 100%;
        object-fit: cover;
    }
    @media (max-width: 768px) {
        width: 90%;
        height: auto;
    }
`;
const TomarFoto = ({ setTomandoFoto, setArrFotos, arrFotos, idAlbum }) => {
    const [stream, setStream] = useState(null);
    const [fotoTomada, setFotoTomada] = useState(null);
    const { fotosPixaby, setFotosPixaby } = useContext(ContextInicio);

    useEffect(() => {
        const video = document.querySelector("#video");

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    video.srcObject = stream;
                    setStream(stream);
                })
                .catch((err) => {
                    console.log("Ocurrio un error" + err);
                });
        }

        return () => {
            setTomandoFoto(false);
        };
    }, []);

    //funcion que toma la foto
    const tomarFoto = () => {
        const video = document.querySelector("#video");
        const width = video.videoWidth;
        const height = video.videoHeight;
        const canvas = document.createElement("canvas");
        canvas.setAttribute("height", "420px");
        canvas.setAttribute("width", "600px");
        canvas.getContext("2d").drawImage(video, 0, 0, width, height);
        let data = canvas.toDataURL("image/png");
        console.log(data);
        setFotoTomada(true);
        const containerFoto = document.querySelector("#container-foto");
        const img = document.createElement("img");
        img.src = data;
        containerFoto.appendChild(img);
        if (idAlbum !== "pixaby") {
            setArrFotos([...arrFotos, { data, id: uuidv4() }]);
        } else {
            setFotosPixaby([...fotosPixaby, { data, id: uuidv4() }]);
        }
    };

    //para el streaming
    const stopStreaming = () => {
        //esto cierra el stream
        stream.getTracks()[0].stop();
        setTomandoFoto(false);
    };
    return (
        <div className="modal">
            <button className="btn" onClick={stopStreaming}>
                <i className="fas fa-times-circle"></i>
            </button>
            <Div id="container-foto">
                {!fotoTomada && <Video autoPlay={true} id="video"></Video>}
            </Div>

            <button
                disabled={fotoTomada ? true : false}
                type="button"
                className="btn"
                onClick={tomarFoto}
            >
                <i className="fas fa-camera"></i>
            </button>
        </div>
    );
};

export default TomarFoto;

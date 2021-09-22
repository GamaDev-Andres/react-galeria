import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../environment/evironment";
import { getDownloadURL, uploadString, ref } from "firebase/storage";
import Spinner from "./Spinner";
// import useFirebase from "../../hooks/useFirebase";
// import { ContextInicio } from "../ContextIncio";

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
    const [spinner, setSpinner] = useState(false);

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

        setFotoTomada(true);
        const containerFoto = document.querySelector("#container-foto");
        const img = document.createElement("img");
        img.src = data;
        containerFoto.appendChild(img);
        let idFoto = uuidv4();
        const imagesRef = ref(storage, `imagenes-galeria/${idFoto}`);
        setSpinner(true);
        uploadString(imagesRef, data, "data_url").then((snapshot) => {
            console.log("archivo cargado");
            console.log(snapshot);
            getDownloadURL(imagesRef).then((rta) => {
                console.log("URL DE LA FOTO ", rta);
                setArrFotos([...arrFotos, { data: rta, id: idFoto }]);
                setSpinner(false);
            });
        });
    };

    //para el streaming
    const stopStreaming = () => {
        //esto cierra el stream
        stream.getTracks()[0].stop();
        setTomandoFoto(false);
    };
    return (
        <>
            {spinner && <Spinner />}
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
        </>
    );
};

export default TomarFoto;

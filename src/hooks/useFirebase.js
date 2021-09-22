import { deleteObject } from "@firebase/storage";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../environment/evironment";

const useFirebase = () => {
    //creacion doc del usuario
    const createDoc = async (user) => {
        //creo documento en firebase
        let data = {
            pixaby: {
                nameAlbum: "pixaby",
                descripcion: "Fotos favoritas escogidas de la pagina de inicio",
                id: "pixaby",
                fotos: [],
            },
        };
        console.log("creando DOC");

        const rta = await setDoc(doc(db, "usuarios", user.uid), data);
        console.log(rta);
    };
    const createAlbum = async (user, albumes, album) => {
        const albumRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(albumRef);

        await updateDoc(albumRef, {
            ...docSnap.data(),
            [album.nameAlbum]: album,
        });
    };
    const updateDocument = async (user, data, datosAlbum) => {
        const albumRef = doc(db, "usuarios", user.uid);
        await updateDoc(albumRef, {
            [datosAlbum.nameAlbum]: { ...datosAlbum, fotos: data },
        });
    };
    const deleteFileStorage = (fileRef) => {
        console.log(fileRef);
        deleteObject(fileRef)
            .then((res) => {
                console.log("foto eliminada!", res);
            })
            .catch((error) => {
                // console.log("ocurrio error eliminando foto ", error);
                console.log(error.code);
                if (error.code === "storage/object-not-found") {
                    console.log("foto eliminada");
                } else {
                    console.log(error);
                }
            });
    };

    return {
        createDoc,
        updateDocument,
        deleteFileStorage,
        createAlbum,
    };
};

export default useFirebase;

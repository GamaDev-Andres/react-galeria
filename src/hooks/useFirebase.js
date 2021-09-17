import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
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

        // Atomically add a new region to the "regions" array field.
        // await updateDoc(albumRef, {
        //     albums: arrayUnion(data),
        // });

        // Atomically remove a region from the "regions" array field.
    };

    return {
        createDoc,
        updateDocument,

        createAlbum,
    };
};

export default useFirebase;

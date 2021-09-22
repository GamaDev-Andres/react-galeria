import { deleteObject, listAll, ref } from "@firebase/storage";
import {
    doc,
    setDoc,
    updateDoc,
    getDoc,
    deleteField,
} from "firebase/firestore";
import { db, storage } from "../environment/evironment";

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
    //crea album en firestore
    const createAlbum = async (user, albumes, album) => {
        const albumRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(albumRef);

        await updateDoc(albumRef, {
            ...docSnap.data(),
            [album.nameAlbum]: album,
        });
    };
    //actualiza las fotos del respectivo album de cierto user
    const updateDocument = async (user, data, datosAlbum) => {
        const albumRef = doc(db, "usuarios", user.uid);
        await updateDoc(albumRef, {
            [datosAlbum.nameAlbum]: { ...datosAlbum, fotos: data },
        });
    };
    //elimina fotos del storage del firebase
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

    //elimina campos de firestore
    const deleteCampoFireStore = async (userId, campo) => {
        const referencia = doc(db, "usuarios", userId);
        await updateDoc(referencia, {
            [campo]: deleteField(),
        });
    };
    //elimina album en el storage de firebase
    const deleteAlbumStorage = async (userId, nameAlbum) => {
        const referencia = ref(
            storage,
            `imagenes-galeria/${userId}/${nameAlbum}`
        );
        listAll(referencia).then((res) => {
            console.log(res.items);
            res.items.forEach((itemRef) => {
                console.log(itemRef);

                deleteObject(itemRef)
                    .then((res) => {
                        console.log("album " + nameAlbum + " eliminado");
                    })
                    .catch((error) => {
                        console.log("hubo un error eliminando el album");
                        console.log(error);
                    });
            });
        });
    };
    return {
        createDoc,
        updateDocument,
        deleteFileStorage,
        createAlbum,
        deleteCampoFireStore,
        deleteAlbumStorage,
    };
};

export default useFirebase;

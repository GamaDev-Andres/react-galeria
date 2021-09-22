import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import {
    signOut,
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { ContextInicio } from "../ContextIncio";

const Alerta = styled.p`
    display: block;
    padding: 1rem;
    width: 90%;
    font-weight: bold;
    background-color: red;
`;
const Login = () => {
    const [alerta, setAlerta] = useState(false);
    const [userForm, setUserForm] = useState({
        email: "",
        password: "",
    });
    const { user, setUser } = useContext(ContextInicio);
    const { email, password } = userForm;
    let history = useHistory();

    //submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar que no haya campos vacios
        if (email.trim() === "" || password.trim() === "") {
            setAlerta("todos los campos son obligatorios");
            return;
        }
        if (user) {
            const auth = getAuth();
            signOut(auth)
                .then((res) => {
                    console.log(res);
                    setUser(null);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        // Pasarlo al action
        //  iniciarSesion({ email, contraseña });
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUserForm({
                    email: "",
                    password: "",
                });
                setAlerta(null);
                history.push("/");
            })
            .catch((error) => {
                console.log("error code ----" + error.code);
                if (error.code === "auth/wrong-password") {
                    setAlerta("Error, contraseña incorrecta");
                }
                if (error.code === "auth/user-not-found") {
                    setAlerta("Error, usuario no existente o incorrecto");
                }
                console.log(error.message);
            });
        // history.push("/");
    };
    const handleChange = (e) => {
        setUserForm({
            ...userForm,
            [e.target.name]: e.target.value,
        });
    };
    const inicioConGoogle = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                // console.log(result.user);
                console.log(credential);
            })
            .catch((err) => {
                const credential = GoogleAuthProvider.credentialFromError(err);
                console.log(credential);
            });
    };
    return (
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>
                {alerta ? <Alerta>{alerta}</Alerta> : null}

                <form onSubmit={handleSubmit}>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <button type="submit" className="btn">
                            Iniciar Sesión
                        </button>
                    </div>
                    <button
                        onClick={inicioConGoogle}
                        className="icon-google"
                        type="button"
                    >
                        Inicia sesion con Google
                        <FcGoogle />
                    </button>
                </form>

                <Link to={"/nueva-cuenta"} className="enlace-cuenta">
                    Obtener Cuenta
                </Link>
            </div>
        </div>
    );
};

export default Login;

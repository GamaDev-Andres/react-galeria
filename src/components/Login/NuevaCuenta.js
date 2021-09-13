import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
// import { auth } from "../../environment/evironment";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// import from ""

const Alerta = styled.p`
    display: block;
    padding: 1rem;
    width: 90%;
    font-weight: bold;
    background-color: red;
    color: white !important;
`;
const NuevaCuenta = () => {
    const [alerta, setAlerta] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const { email, password, confirmPassword } = user;
    let history = useHistory();

    //submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar que no haya campos vacios
        if (
            email.trim() === "" ||
            password.trim() === "" ||
            confirmPassword.trim() === ""
        ) {
            setAlerta("todos los campos son obligatorios");
            return;
        }
        if (password !== confirmPassword) {
            setAlerta("Las contraseñas no coinciden");
            return;
        }

        // Pasarlo al action
        //  iniciarSesion({ email, contraseña });
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                let user = userCredential.user;
                setUser({
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
                setAlerta(null);
                history.push("/");
                console.log(user);
            })
            .catch((error) => {
                if (error.code === "auth/weak-password") {
                    setAlerta(
                        "La contraseña deberia de tener al menos 6 caracteres"
                    );
                }
                if (error.code === "auth/invalid-email") {
                    setAlerta("Formato de email invalido");
                }
                if (error.code === "auth/email-already-in-use") {
                    setAlerta("Email ya registrado, intenta con oto");
                }
                console.log(error.code);
                console.log(error.message);
            });
        // history.push("/");
    };
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Registrate</h1>
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
                        <label htmlFor="confirm-assword">
                            {" "}
                            confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirm-assword"
                            name="confirmPassword"
                            placeholder="confirma tu contraseña"
                            value={confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <button type="submit" className="btn">
                            Crear cuenta
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NuevaCuenta;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CAlbum from "./components/CreacionAlbum/CAlbum";
import Galeria from "./components/Galeria/Galeria";
import Header from "./components/Header";
import ContextIncioProvider from "./components/ContextIncio";
import Inicio from "./components/Inicio/Inicio";
import MenuResponsive from "./components/MenuResponsive";
import "./components/Inicio/styleInicio.scss";
import Login from "./components/Login/Login";
import NuevaCuenta from "./components/Login/NuevaCuenta";
import PrivateRoute from "./components/PrivateRoute";
import PrivateRouteLogin from "./components/PrivateRouteLogin";

function App() {
    return (
        <>
            <Router>
                <ContextIncioProvider>
                    <Header />
                    <Switch>
                        <PrivateRoute exact path="/" component={Inicio} />
                        <PrivateRoute
                            exact
                            path="/galeria"
                            component={Galeria}
                        />
                        <PrivateRoute
                            exact
                            path="/creacion-album"
                            component={CAlbum}
                        />
                        <PrivateRouteLogin
                            exact
                            path="/login"
                            component={Login}
                        />
                        <PrivateRouteLogin
                            exact
                            path="/nueva-cuenta"
                            component={NuevaCuenta}
                        />
                    </Switch>
                    <MenuResponsive />
                </ContextIncioProvider>
            </Router>
        </>
    );
}

export default App;

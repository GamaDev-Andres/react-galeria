import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CAlbum from "./components/CreacionAlbum/CAlbum";
import Galeria from "./components/Galeria/Galeria";
import Header from "./components/Header";
import ContextIncioProvider from "./components/Inicio/ContextIncio";
import Inicio from "./components/Inicio/Inicio";
import MenuResponsive from "./components/MenuResponsive";
import "./components/Inicio/styleInicio.scss";

function App() {
    return (
        <>
            <Router>
                <ContextIncioProvider>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Inicio} />
                        <Route exact path="/galeria" component={Galeria} />
                        <Route
                            exact
                            path="/creacion-album"
                            component={CAlbum}
                        />
                    </Switch>
                    <MenuResponsive />
                </ContextIncioProvider>
            </Router>
        </>
    );
}

export default App;

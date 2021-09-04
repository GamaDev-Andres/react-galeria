import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Galeria from "./components/Galeria/Galeria";
import Header from "./components/Header";
import ContextIncioProvider from "./components/Inicio/ContextIncio";
import Inicio from "./components/Inicio/Inicio";
import MenuResponsive from "./components/MenuResponsive";
function App() {
    return (
        <>
            <Router>
                <ContextIncioProvider>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Inicio} />
                        <Route exact path="/galeria" component={Galeria} />
                    </Switch>
                    <MenuResponsive />
                </ContextIncioProvider>
            </Router>
        </>
    );
}

export default App;

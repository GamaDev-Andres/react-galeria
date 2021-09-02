import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Galeria from "./components/Galeria/Galeria";
import Header from "./components/Header";
import Inicio from "./components/Inicio/Inicio";

function App() {
    return (
        <>
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/" component={Inicio} />
                    <Route exact path="/galeria" component={Galeria} />
                </Switch>
            </Router>
        </>
    );
}

export default App;

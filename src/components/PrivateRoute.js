import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { ContextInicio } from "./ContextIncio";

const PrivateRoute = (props) => {
    const { user } = useContext(ContextInicio);
    return (
        <Route exact={props.exact} path={props.path}>
            {user ? <props.component /> : <Redirect exact to={"/login"} />}
        </Route>
    );
};

export default PrivateRoute;

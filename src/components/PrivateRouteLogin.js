import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { ContextInicio } from "./ContextIncio";
const PrivateRouteLogin = (props) => {
    const { user } = useContext(ContextInicio);
    return (
        <Route exact={props.exact} path={props.path}>
            {!user ? <props.component /> : <Redirect exact to={"/"} />}
        </Route>
    );
};

export default PrivateRouteLogin;

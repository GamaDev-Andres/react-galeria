import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { ContextInicio } from "./ContextIncio";

const PrivateRoute = (props) => {
    const { user } = useContext(ContextInicio);
    return (
        // <Route {...rest}>
        //     {user ? <Component /> : <Redirect exact to={"/login"} />}
        // </Route>
        <Route
            exact={props.exact}
            path={props.path}
            // component={props.component}
        >
            {user ? <props.component /> : <Redirect exact to={"/login"} />}
        </Route>
    );
};

export default PrivateRoute;

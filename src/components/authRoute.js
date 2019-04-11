import React from 'react';
import {Route, Redirect} from 'react-router';

export default function AuthRoute({component: Component, ...rest}) {
    return (
        <Route
            {...rest}
            render={
                props => {
                    const {auth} = rest;
                    return auth ? <Component {...props}/> : <Redirect to='/403'/>
                }
            }/>
    );
}
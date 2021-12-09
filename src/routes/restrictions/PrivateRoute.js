import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router';

import Base from '../../layouts/Base';

export default function PrivateRoute({ component: Component, ...rest }){

    const { isAuthenticated } = useSelector(state => state.auth);

    return (
        <Route 
            {...rest}
            render={props => (
                isAuthenticated ? (
                    <Base>
                        <Component {...props} />
                    </Base>
                ) : (
                    <Redirect to={{
                        pathname:  '/',
                        state: { from: props.location  }
                    }} />
                )
            )}
        />
    )

}
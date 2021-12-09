import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router';

import Base from '../../layouts/Base';

export default function SplitRoute({ component: Component, fallback: Fallback, ...rest }){

    const { isAuthenticated } = useSelector(state => state.auth);

    return (
        <Route 
            {...rest}
            render={props=>(
                isAuthenticated ? ( 
                    <Base>
                        <Component {...props} />
                    </Base> 
                ) : (
                    <Base>
                        <Fallback {...props}/>
                    </Base>
                )
            )}
        />
    )
}
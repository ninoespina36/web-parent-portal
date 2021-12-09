import React from 'react';
// import { useSelector } from 'react-redux';

export default function Base({ children }){

    // const { isAuthenticated } = useSelector(state => state.auth);

    return (
        <div className="bg-white">
            <main>

                <div>
                    { children }
                </div>
                
            </main>
        </div>
    )
}
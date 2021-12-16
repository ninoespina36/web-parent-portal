import React from 'react';

export default function Base({ children }){

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
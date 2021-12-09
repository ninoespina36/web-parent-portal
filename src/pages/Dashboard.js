import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../store/reducers/authReducer';
import maintenance from '../images/maintenance.png';

export default function Dashboard(){

    const { user: { firstName } } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    return (
        <div className="h-screen w-screen flex flex-wrap items-center justify-center">
            <div className="xl:w-1/2 w-full">
                <img src={maintenance} className="mx-auto xl:w-3/4" alt="Maintenance"/>
            </div>
            <div className="xl:w-1/2 w-full sm:px-20 px-5">
                <h1 className="md:text-7xl text-4xl font-bold">Under <br/> Construction</h1>
                <p className="mt-10 font-medium text-gray-600 text-xl">Hey {firstName}, the system is under construction. Come back later.</p>
                <button onClick={()=>dispatch(logout())} className="btn btn-primary mt-5">Log out</button>
            </div>
        </div>
    )
}
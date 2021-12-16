import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { MailIcon, KeyIcon } from '@heroicons/react/outline';
import moment from 'moment';
import _ from 'underscore';

import logo from '../../images/eve.png';
import edulearnLogo from '../../images/edulearn-logo.png';
import vector_1 from '../../images/vector-1.png';
import vector_2 from '../../images/vector-2.png';
import schoolLogo from '../../images/SCHOOL.png';
import AuthInput from '../../components/Auth/AuthInput';
import AuthSubmitBtn from '../../components/Auth/AuthSubmitBtn';
import AuthBackBtn from '../../components/Auth/AuthBackBtn';
import Toast from '../../components/Toast';
import { authLogin } from '../../services/authService';
import { displayErrors, showServerError } from '../../Helpers';

export default function Login(){

    const dispatch = useDispatch();
    const [ loading, setLoading ] = useState(false);
    const history = useHistory();
    const [ errors, setErrors ] = useState([]);
    const [ credentials, setCredentials ] = useState({
        username: '',
        password: ''
    });

    const formLogin = e =>{
        
        e.preventDefault();
        setLoading(true);
        setErrors([]);

        dispatch(authLogin(credentials))
        .catch(err=>{
            console.log(err)
            setLoading(false);
            if(err){
                if(err.status === 400){
                    if(err.data.errors){
                        setErrors(_.map(_.keys(err.data.errors), key => {
                            return key;
                        }));
                        Toast.error(displayErrors(err.data.errors, err.data.title));
                    }else Toast.error(err.data);
                }
            }else showServerError();
        })
    }

    const handleChange = e =>{
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
    }

    return (
        <div className="flex flex-grow bg-gray-100 h-screen w-screen items-center justify-center relative px-4 pb-28 md:pb-0 bg-cover overflow-hidden">
            <form onSubmit={formLogin} className="sm:w-auto w-full">
                <img 
                    className="w-2/6 mx-auto sm:mb-10 mb-5"
                    src={logo}
                    alt="EVE logo"
                />
                <div className="shadow-3xl bg-white sm:w-96 w-full rounded-lg overflow-hidden mx-auto">
                    <div className="sm:p-10 p-8">
                        <img 
                            className="w-1/4 mx-auto mb-3"
                            src={schoolLogo}
                            alt="SCHOOL logo"
                        />
                        <h1 className="text-lg text-gray-600 mb-4 mx-auto font-medium block text-center">Log In to your account</h1>
                            <AuthInput
                                type="email"
                                placeholder="Email Address"
                                name="username"
                                value={credentials.username}
                                onChange={handleChange}
                                icon={<MailIcon className="h-5 text-gray-400 px-3 group-hover:text-eve-blue-700 transition duration-200 absolute"/>}
                                className={`${errors.includes('Username') ? 'input-error' : ''}`}
                                containerClassName="mb-2"
                            />
                            <AuthInput
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                icon={<KeyIcon className="h-5 text-gray-400 px-3 group-hover:text-eve-blue-700 transition duration-200 absolute"/>}
                                className={`${errors.includes('Password') ? 'input-error' : ''}`}
                                required
                            />
                        <div className="flex justify-end py-3 text-md mb-2">
                            <Link to="/forgot-password" className="text-eve-blue-700 text-sm">Forgot your password?</Link>
                        </div>
                        <AuthSubmitBtn
                            text="Log In"
                            loading={loading}
                            className="mb-2"
                        />
                        <AuthBackBtn
                            text="Create New Account"
                            onClick={()=>history.push('register')}
                        />
                    </div>
                </div>
            </form>
            <div  className="absolute bottom-5">
                <img 
                    className="w-20 block mx-auto mb-3"
                    src={edulearnLogo}
                    alt="ADAM logo"
                />
                <p className="text-xs text-gray-400 text-center px-5 block">Powered by EduLearn Technologies, Inc. {moment().format('YYYY')}</p>
            </div>
            <img 
                className="absolute right-0 bottom-0 w-4/12 image hidden sm:block"
                src={vector_1}
                alt=""
            />
            <img 
                className="absolute left-0 bottom-0 w-4/12 image hidden sm:block"
                src={vector_2}
                alt=""
            />
        </div>
    )
}
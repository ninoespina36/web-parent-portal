import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { MailIcon, KeyIcon, LockClosedIcon } from '@heroicons/react/outline';
import _ from 'underscore';

import logo from '../../images/eve_white.png';
import schoolLogo from '../../images/SCHOOL.png';
import bg from '../../images/registration-bg.png';
import AuthInput from '../../components/Auth/AuthInput';
import AuthSubmitBtn from '../../components/Auth/AuthSubmitBtn';
import AuthSelect from '../../components/Auth/AuthSelect';
import Toast from '../../components/Toast';
import { getReference } from '../../services/referenceService';
import { authRegister } from '../../services/authService';
import { encryptData } from '../../Helpers';
import { displayErrors } from '../../Helpers';

export default function Regiser(){

    const dispatch = useDispatch();
    const [ loading, setLoading ] = useState(false);
    const [ errors, setErrors ] = useState([]);
    const history = useHistory();
    
    const [ relationshipOptionsLoading, setRelationshipOptionsLoading ] = useState(true);
    const [ relationshipOptions, setRelationshipOptions ] = useState([]);

    const [ credentials, setCredentials ] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        username: '',
        referenceCode: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobileNumber: '',
        schoolID: 1,
        checked: false
    });

    const formRegister = e =>{

        e.preventDefault();
        setLoading(true);
        setErrors([]);
        dispatch(authRegister(credentials))
        .then(res=>{
            setLoading(false);
            history.push(`/parent-information/${encryptData(res.data)}`);
        })
        .catch(err=>{
            setLoading(false);
            if(err){
                if(err.status === 400){
                    setErrors(_.map(_.keys(err.data.errors), key => {
                        return key;
                    }));
                    Toast.error(displayErrors(err.data.errors, err.data.title));
                }
            }else Toast.error('Something went wrong. Please try again later.');
        })
    }

    const handleChange = e =>{
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
    }

    const handleCheckbox = () =>{
        setCredentials({
            ...credentials,
            checked: !credentials.checked
        })
    }

    useEffect(()=>{
        let isMounted  = true;
        
        dispatch(getReference('RELATIONSHIPTYPE'))
        .then(res=>{
            if(isMounted){
                setRelationshipOptions(res.data.map(item=>{
                    const { referenceCode: value, referenceDesc: label } = item;
                    return { value, label };
                }));
                setRelationshipOptionsLoading(false);
            }
        })
        .catch(err=>{
            console.log(err)
        })

        return ()=> isMounted = false;
    }, [ dispatch ]);

    return (
        <div className="flex flex-grow bg-gray-100 min-h-screen min-w-screen items-center justify-center relative p-4">
            <form onSubmit={formRegister}>
               
                <div className="shadow-3xl bg-white w-full rounded-lg overflow-hidden">
                    <div className="grid grid-cols-12">
                        <div className="md:col-span-4 col-span-12 bg-primary bg-cover bg-top relative" style={{ backgroundImage: `url(${bg})` }}>
                            <div className="absolute top-0 left-0 w-full md:block hidden">
                                <img 
                                    className="w-3/4 my-20 mx-auto"
                                    src={logo}
                                    alt="EVE logo"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-8 col-span-12">
                            <div className="sm:p-14 p-8">
                               
                                <div className="md:flex justify-between items-center mb-5">
                                    <div className="md:order-last order-first">
                                        <img 
                                            className="h-16 md:mb-0 mb-3"
                                            src={schoolLogo}
                                            alt="SCHOOL logo"
                                        />
                                    </div>
                                    <div>
                                        <h1 className="text-lg text-gray-600 mb-0 mx-auto font-medium block">Account Registration</h1>
                                        <p className="text-sm text-gray-500 mb-4">Create your account. Its free and only takes a minute.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-x-3">
                                    <div className="md:col-span-4 col-span-12">
                                        <AuthInput
                                            placeholder="First Name"
                                            name="firstName"
                                            value={credentials.firstName}
                                            onChange={handleChange}
                                            className={`${errors.includes('FirstName') ? 'input-error' : ''}`}
                                            required
                                            hasLabel
                                        />
                                    </div>
                                    <div className="md:col-span-4 col-span-12">
                                        <AuthInput
                                            placeholder="Last Name"
                                            name="lastName"
                                            value={credentials.lastName}
                                            onChange={handleChange}
                                            className={`${errors.includes('LastName') ? 'input-error' : ''}`}
                                            required
                                            hasLabel
                                        />
                                    </div>
                                    <div className="md:col-span-4 col-span-12">
                                        <AuthInput
                                            placeholder="Middle Name"
                                            name="middleName"
                                            value={credentials.middleName}
                                            onChange={handleChange}
                                            hasLabel
                                        />
                                    </div>
                                    <div className="md:col-span-6 col-span-12">
                                       <AuthSelect
                                            options={relationshipOptions}
                                            placeholder="Relationship to Student"
                                            isLoading={relationshipOptionsLoading}
                                            onChange={({value}) => setCredentials({...credentials, referenceCode: value})}
                                            hasError={errors.includes('ReferenceCode')}
                                            required
                                            hasLabel
                                       />
                                    </div>
                                    <div className="md:col-span-6 col-span-12">
                                        <AuthInput
                                            placeholder="Mobile Number"
                                            name="mobileNumber"
                                            value={credentials.mobileNumber}
                                            onChange={handleChange}
                                            className={`${errors.includes('MobileNumber') ? 'input-error' : ''}`}
                                            required
                                            hasLabel
                                        />
                                    </div>
                                    <div className="col-span-12">
                                        <AuthInput
                                            type="email"
                                            placeholder="Email Address"
                                            name="username"
                                            value={credentials.username}
                                            onChange={handleChange}
                                            icon={<MailIcon className="h-5 text-gray-400 px-3 group-hover:text-eve-blue-700 transition duration-200 absolute"/>}
                                            className={`${errors.includes('Email') ? 'input-error' : ''}`}
                                            required
                                            hasLabel
                                        />
                                    </div>
                                    <div className="md:col-span-6 col-span-12">
                                        <AuthInput
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            value={credentials.password}
                                            onChange={handleChange}
                                            icon={<KeyIcon className="h-5 text-gray-400 px-3 group-hover:text-eve-blue-700 transition duration-200 absolute"/>}
                                            className={`${errors.includes('Password') ? 'input-error' : ''}`}
                                            required
                                            hasLabel
                                        />
                                    </div>
                                    <div className="md:col-span-6 col-span-12">
                                        <AuthInput
                                            type="password"
                                            placeholder="Confirm Password"
                                            name="confirmPassword"
                                            value={credentials.confirmPassword}
                                            onChange={handleChange}
                                            icon={<LockClosedIcon className="h-5 text-gray-400 px-3 group-hover:text-eve-blue-700 transition duration-200 absolute"/>}
                                            required
                                            hasLabel
                                        />
                                    </div>
                                    <div className="col-span-12">
                                        <div className="form-control mt-5">
                                            <label className="cursor-pointer label justify-start">
                                                <input type="checkbox" checked={credentials.checked} className="checkbox checkbox-primary" onChange={handleCheckbox} />
                                                <span className="label-text ml-3">I accept the <span className="text-eve-blue-500">Terms and Conditions</span> & <span className="text-eve-blue-500">Privacy Policy</span></span> 
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-80 w-full">
                                    <AuthSubmitBtn
                                        text="Register Now"
                                        loading={loading}
                                        className="mt-5"
                                    />
                                    <p className="text-sm mt-5 font-medium md:text-left text-center">Already have an account? <Link to="/" className="text-primary">Log In</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MailIcon, PhoneIcon, DeviceMobileIcon } from '@heroicons/react/outline';
import { useHistory, Redirect } from 'react-router';
import _ from 'underscore';

import schoolLogo from '../../images/SCHOOL.png';
import AuthInput from '../../components/Auth/AuthInput';
import AuthSubmitBtn from '../../components/Auth/AuthSubmitBtn';
import AuthBackBtn from '../../components/Auth/AuthBackBtn';
import AuthSelect from '../../components/Auth/AuthSelect';
import Toast from '../../components/Toast';
import { getReference } from '../../services/referenceService';
import { updateParentInformation, updateParentAddress } from '../../services/authService';
import { displayErrors, confirmAlert, showServerError } from '../../Helpers';
import { logout, grantUser } from '../../store/reducers/authReducer';

export default function ParentInformation(){

    const dispatch = useDispatch();
    const history = useHistory();
    const { user: { applicantUserID, isNewUser } } = useSelector(state => state.auth);
    const [ loading, setLoading ] = useState(false);
    const [ relationshipOptionsLoading, setRelationshipOptionsLoading ] = useState(true);
    const [ relationshipOptions, setRelationshipOptions ] = useState([]);
    const [ errors, setErrors ] = useState([]);

    console.log(errors)

    const [ info, setInfo ] = useState({
        applicantUserId: applicantUserID,

        motherTitle: '',
        motherFirstName: '',
        motherLastName: '',
        motherMiddleName: '',
        motherSuffix: '',
        motherBirthdate: '',
        motherEducationalAttainment: '',
        motherCompany: '',
        motherDesignation: '',
        motherMobileNumber: '',
        motherEmailAddress: '',
        motherLandline: '',

        fatherTitle: '',
        fatherFirstName: '',
        fatherLastName: '',
        fatherMiddleName: '',
        fatherSuffix: '',
        fatherBirthdate: '',
        fatherEducationalAttainment: '',
        fatherCompany: '',
        fatherDesignation: '',
        fatherMobileNumber: '',
        fatherEmailAddress: '',
        fatherLandline: '',

        guardianTitle: '',
        guardianFirstName: '',
        guardianLastName: '',
        guardianMiddleName: '',
        guardianSuffix: '',
        guardianBirthdate: '',
        guardianEducationalAttainment: '',
        guardianCompany: '',
        guardianDesignation: '',
        guardianMobileNumber: '',
        guardianEmailAddress: '',
        guardianLandline: '',
        refRelationshipTypeId: 0,

        street: '',
        barangay: '',
        municipality: '',
        province: '',
        country: '',
        zipCode: ''
    });

    const handleChange = e =>{
        const { name, value } = e.target;
        setInfo({
            ...info,
            [name]: value
        });
    }

    const confirmLogout = () =>{
        confirmAlert({
            type: 'error',
            title: 'Logout',
            body: <p>Are you sure you want to logout?</p>,
            btnText: 'Logout',
            onClick: ()=> dispatch(logout())
        })
    }

    const updateInformation = e =>{

        e.preventDefault();
        setLoading(true);
        setErrors([]);

        dispatch(updateParentInformation(info))
        .then(res=>{
            if(res.status === 200) updateAddress();
            else setLoading(false);
        })
        .catch(err=>{
            setLoading(false);
            if(err){
                if(err.status === 400){
                    setErrors(_.map(_.keys(err.data.errors), key => {
                        return key.replace('$.','');;
                    }));
                    Toast.error(displayErrors(err.data.errors, err.data.title));
                }
            }else showServerError();
        })
    }

    const updateAddress = () =>{
        dispatch(updateParentAddress({
            applicantUserID,
            address1: info.street,
            address2: info.barangay,
            address3: info.municipality,
            address4: info.province,
            country: info.country,
            zipCode: info.zipCode
        }))
        .then(res=>{
            if(res.status === 200){
                Toast.success('Your information has been successfully updated.');
                dispatch(grantUser());
                history.push('/');
            }
            else setLoading(false);
        })
        .catch(err=>{
            setLoading(false);
            if(err){
                if(err.status === 400){
                    setErrors(_.map(_.keys(err.data.errors), key => {
                        return key.replace('$.','');
                    }));
                    Toast.error(displayErrors(err.data.errors, err.data.title));
                }
            }else showServerError();
        })
    }

    useEffect(()=>{
        let isMounted  = true;
        dispatch(getReference('RELATIONSHIPTYPE'))
        .then(res=>{
            if(isMounted){
                setRelationshipOptions(res.data.map(item=>{
                    const { referenceID: value, referenceDesc: label } = item;
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

    if(!isNewUser){
       return  <Redirect to="/" />
    }

    return (
        <div className="flex flex-grow bg-gray-100 min-h-screen min-w-screen items-center justify-center relative p-4">
            <form onSubmit={updateInformation} className="md:w-auto w-full">
               
                <div className="shadow-3xl bg-white w-full rounded-lg overflow-hidden">
                    <div className="grid grid-cols-12">
                        <div className="md:col-span-12 col-span-12">
                            <div className="">
                               
                                <div className="md:flex justify-between items-center sm:px-14 p-8">
                                    <div className="md:order-last">
                                        <div className="flex items-center justify-center gap-x-4">
                                            <img 
                                                className="h-16 md:mb-0 mb-3 flex-shrink-0"
                                                src={schoolLogo}
                                                alt="SCHOOL logo"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="text-xl text-gray-600 mb-0 mx-auto font-medium block md:text-left text-center md:mt-0 mt-3">Parent Information Form</h1>
                                        {/* <p className="text-sm text-gray-500 mb-4">Create your account. Its free and only takes a minute.</p> */}
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-lg text-gray-600 mb-2 mx-auto font-medium block border-t pt-8 sm:px-14 px-8">Mother</h1>
                                    <div className="grid grid-cols-12 gap-x-3 sm:px-14 sm:pb-14 p-8 pt-0">
                                        <div className="md:col-span-6 col-span-12">
                                            <AuthInput
                                                placeholder="First Name"
                                                name="motherFirstName"
                                                value={info.motherFirstName}
                                                onChange={handleChange}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <AuthInput
                                                placeholder="Last Name"
                                                name="motherLastName"
                                                value={info.motherLastName}
                                                onChange={handleChange}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Middle Name"
                                                name="motherMiddleName"
                                                value={info.motherMiddleName}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Suffix"
                                                name="motherSuffix"
                                                value={info.motherSuffix}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                type="date"
                                                placeholder="Birthdate"
                                                name="motherBirthdate"
                                                value={info.motherBirthdate}
                                                onChange={handleChange}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <AuthInput
                                                placeholder="Educational Attainment"
                                                name="motherEducationalAttainment"
                                                value={info.motherEducationalAttainment}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <AuthInput
                                                placeholder="Occupation"
                                                name="motherTitle"
                                                value={info.motherTitle}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <AuthInput
                                                placeholder="Company"
                                                name="motherCompany"
                                                value={info.motherCompany}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <AuthInput
                                                placeholder="Designation"
                                                name="motherDesignation"
                                                value={info.motherDesignation}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Mobile Number"
                                                name="motherMobileNumber"
                                                value={info.motherMobileNumber}
                                                onChange={handleChange}
                                                icon={<DeviceMobileIcon className="h-5 text-gray-400 px-3 group-hover:text-eve-blue-700 transition duration-200 absolute"/>}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Email Address"
                                                name="motherEmailAddress"
                                                value={info.motherEmailAddress}
                                                onChange={handleChange}
                                                icon={<MailIcon className="h-5 text-gray-400 px-3 group-hover:text-eve-blue-700 transition duration-200 absolute"/>}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Landline"
                                                name="motherLandline"
                                                value={info.motherLandline}
                                                onChange={handleChange}
                                                icon={<PhoneIcon className="h-5 text-gray-400 px-3 group-hover:text-eve-blue-700 transition duration-200 absolute"/>}
                                                hasLabel
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-lg text-gray-600 mb-2 mx-auto font-medium block border-t pt-8 sm:px-14 px-8">Father</h1>
                                    <div className="grid grid-cols-12 gap-x-3 sm:px-14 sm:pb-14 p-8 pt-0">
                                        <div className="md:col-span-6 col-span-12">
                                            <AuthInput
                                                placeholder="First Name"
                                                name="fatherFirstName"
                                                value={info.fatherFirstName}
                                                onChange={handleChange}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <AuthInput
                                                placeholder="Last Name"
                                                name="fatherLastName"
                                                value={info.fatherLastName}
                                                onChange={handleChange}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Middle Name"
                                                name="fatherMiddleName"
                                                value={info.fatherMiddleName}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Suffix"
                                                name="fatherSuffix"
                                                value={info.fatherSuffix}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                type="date"
                                                placeholder="Birthdate"
                                                name="fatherBirthdate"
                                                value={info.fatherBirthdate}
                                                onChange={handleChange}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <AuthInput
                                                placeholder="Educational Attainment"
                                                name="fatherEducationalAttainment"
                                                value={info.fatherEducationalAttainment}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <AuthInput
                                                placeholder="Occupation"
                                                name="fatherTitle"
                                                value={info.fatherTitle}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <AuthInput
                                                placeholder="Company"
                                                name="fatherCompany"
                                                value={info.fatherCompany}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <AuthInput
                                                placeholder="Designation"
                                                name="fatherDesignation"
                                                value={info.fatherDesignation}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Mobile Number"
                                                name="fatherMobileNumber"
                                                value={info.fatherMobileNumber}
                                                onChange={handleChange}
                                                icon={<DeviceMobileIcon className="h-5 text-gray-400 px-3 group-hover:text-eve-blue-700 transition duration-200 absolute"/>}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Email Address"
                                                name="fatherEmailAddress"
                                                value={info.fatherEmailAddress}
                                                onChange={handleChange}
                                                icon={<MailIcon className="h-5 text-gray-400 px-3 group-hover:text-eve-blue-700 transition duration-200 absolute"/>}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Landline"
                                                name="fatherLandline"
                                                value={info.fatherLandline}
                                                onChange={handleChange}
                                                icon={<PhoneIcon className="h-5 text-gray-400 px-3 group-hover:text-eve-blue-700 transition duration-200 absolute"/>}
                                                hasLabel
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-lg text-gray-600 mb-2 mx-auto font-medium block border-t pt-8 sm:px-14 px-8">Guardian</h1>
                                    <div className="grid grid-cols-12 gap-x-3 sm:px-14 sm:pb-14 p-8 pt-0">
                                        <div className="md:col-span-6 col-span-12">
                                            <AuthInput
                                                placeholder="First Name"
                                                name="guardianFirstName"
                                                value={info.guardianFirstName}
                                                onChange={handleChange}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <AuthInput
                                                placeholder="Last Name"
                                                name="guardianLastName"
                                                value={info.guardianLastName}
                                                onChange={handleChange}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Middle Name"
                                                name="guardianMiddleName"
                                                value={info.guardianMiddleName}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Suffix"
                                                name="guardianSuffix"
                                                value={info.guardianSuffix}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                type="date"
                                                placeholder="Birthdate"
                                                name="guardianBirthdate"
                                                value={info.guardianBirthdate}
                                                onChange={handleChange}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthSelect
                                                options={relationshipOptions}
                                                placeholder="Relationship to Student"
                                                isLoading={relationshipOptionsLoading}
                                                onChange={({value}) => setInfo({...info, refRelationshipTypeId: value})}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Educational Attainment"
                                                name="guardianEducationalAttainment"
                                                value={info.guardianEducationalAttainment}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Occupation"
                                                name="guardianTitle"
                                                value={info.guardianTitle}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <AuthInput
                                                placeholder="Company"
                                                name="guardianCompany"
                                                value={info.guardianCompany}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <AuthInput
                                                placeholder="Designation"
                                                name="guardianDesignation"
                                                value={info.guardianDesignation}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Mobile Number"
                                                name="guardianMobileNumber"
                                                value={info.guardianMobileNumber}
                                                onChange={handleChange}
                                                icon={<DeviceMobileIcon className="h-5 text-gray-400 px-3 group-hover:text-eve-blue-700 transition duration-200 absolute"/>}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Email Address"
                                                name="guardianEmailAddress"
                                                value={info.guardianEmailAddress}
                                                onChange={handleChange}
                                                icon={<MailIcon className="h-5 text-gray-400 px-3 group-hover:text-eve-blue-700 transition duration-200 absolute"/>}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Landline"
                                                name="guardianLandline"
                                                value={info.guardianLandline}
                                                onChange={handleChange}
                                                icon={<PhoneIcon className="h-5 text-gray-400 px-3 group-hover:text-eve-blue-700 transition duration-200 absolute"/>}
                                                hasLabel
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-lg text-gray-600 mb-2 mx-auto font-medium block border-t pt-8 sm:px-14 px-8">Address Information</h1>
                                    <div className="grid grid-cols-12 gap-x-3 sm:px-14 px-8">
                                        <div className="col-span-12">
                                            <AuthInput
                                                placeholder="House/Unit/Flr #, Bldg Name, Blk or Lot #"
                                                name="street"
                                                value={info.street}
                                                onChange={handleChange}
                                                className={`${errors.includes('Address1') ? 'input-error' : ''}`}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <AuthInput
                                                placeholder="Barangay"
                                                name="barangay"
                                                value={info.barangay}
                                                onChange={handleChange}
                                                className={`${errors.includes('Address2') ? 'input-error' : ''}`}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <AuthInput
                                                placeholder="Municipality"
                                                name="municipality"
                                                value={info.municipality}
                                                onChange={handleChange}
                                                className={`${errors.includes('Address3') ? 'input-error' : ''}`}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Province"
                                                name="province"
                                                value={info.province}
                                                onChange={handleChange}
                                                className={`${errors.includes('Address4') ? 'input-error' : ''}`}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Country"
                                                name="country"
                                                value={info.country}
                                                onChange={handleChange}
                                                className={`${errors.includes('Country') ? 'input-error' : ''}`}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Zip Code"
                                                name="zipCode"
                                                value={info.zipCode}
                                                onChange={handleChange}
                                                className={`${errors.includes('zipCode') ? 'input-error' : ''}`}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-80 w-full sm:px-14 p-8 md:flex gap-x-2">
                                    <AuthBackBtn
                                        text="Logout"
                                        onClick={confirmLogout}
                                    />
                                    <AuthSubmitBtn
                                        text="Update Information"
                                        loading={loading}
                                        className="mt-3 md:mt-0"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
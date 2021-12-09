import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { MailIcon, PhoneIcon, DeviceMobileIcon } from '@heroicons/react/outline';
import { useHistory, useParams } from 'react-router';

// import edulearnLogo from '../../images/edulearn-logo.png';
import schoolLogo from '../../images/SCHOOL.png';
// import moment from 'moment';
import AuthInput from '../../components/Auth/AuthInput';
import AuthSubmitBtn from '../../components/Auth/AuthSubmitBtn';
import { decryptData } from '../../Helpers';
// import Toast from '../../components/Toast';

export default function ParentInformation(){

    // const dispatch = useDispatch();
    const [ loading, setLoading ] = useState(false);
    const { data } = useParams();
    const history = useHistory();
    const [ info, setInfo ] = useState({
        mother_firstName: '',
        mother_lastName: '',
        mother_middleName: '',
        mother_birthdate: '',
        mother_education: '',
        mother_company: '',
        mother_designation: '',
        mother_mobile: '',
        mother_email: '',
        mother_landline: '',

        father_firstName: '',
        father_lastName: '',
        father_middleName: '',
        father_birthdate: '',
        father_education: '',
        father_company: '',
        father_designation: '',
        father_mobile: '',
        father_email: '',
        father_landline: '',

        guardian_firstName: '',
        guardian_lastName: '',
        guardian_guardianmiddleName: '',
        guardian_birthdate: '',
        guardian_education: '',
        guardian_company: '',
        guardian_designation: '',
        guardian_mobile: '',
        guardian_email: '',
        guardian_landline: '',

        street: '',
        barangay: '',
        municipality: '',
        province: '',
        country: '',
        zipCode: ''
    });

    const register = e =>{
        setLoading(true);
        e.preventDefault();
        setTimeout(()=>{
            console.log('registering...')
            setLoading(false);
        }, 2000)
    }

    const handleChange = e =>{
        const { name, value } = e.target;
        setInfo({
            ...info,
            [name]: value
        });
    }

    useEffect(()=>{
        let isMounted = true;
        
        if(decryptData(data)){
            console.log(decryptData(data))
            const { firstName, lastName, middleName, mobileNumber, referenceCode, username } = decryptData(data);
            if(isMounted){
                if(referenceCode.toLowerCase() === 'father')
                    setInfo({
                        ...info,
                        father_firstName: firstName,
                        father_lastName: lastName,
                        father_middleName: middleName,
                        father_mobile: mobileNumber,
                        father_email: username,
                    })
                else if(referenceCode.toLowerCase() === 'mother')
                    setInfo({
                        ...info,
                        mother_firstName: firstName,
                        mother_lastName: lastName,
                        mother_middleName: middleName,
                        mother_mobile: mobileNumber,
                        mother_email: username,
                    })
                else 
                    setInfo({
                        ...info,
                        guardian_firstName: firstName,
                        guardian_lastName: lastName,
                        guardian_middleName: middleName,
                        guardian_mobile: mobileNumber,
                        guardian_email: username,
                    })
            }
        }else history.push('/');

        return ()=> isMounted = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex flex-grow bg-gray-100 min-h-screen min-w-screen items-center justify-center relative p-4">
            <form onSubmit={register} className="md:w-auto w-full">
               
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
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="First Name"
                                                name="mother_firstName"
                                                value={info.mother_firstName}
                                                onChange={handleChange}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Last Name"
                                                name="mother_lastName"
                                                value={info.mother_lastName}
                                                onChange={handleChange}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Middle Name"
                                                name="mother_middleName"
                                                value={info.mother_middleName}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                type="date"
                                                placeholder="Birthdate"
                                                name="mother_birthdate"
                                                value={info.mother_birthdate}
                                                onChange={handleChange}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-8 col-span-12">
                                            <AuthInput
                                                placeholder="Educational Attainment"
                                                name="mother_education"
                                                value={info.mother_education}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <AuthInput
                                                placeholder="Company"
                                                name="mother_company"
                                                value={info.mother_company}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <AuthInput
                                                placeholder="Designation"
                                                name="mother_designation"
                                                value={info.mother_designation}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Mobile Number"
                                                name="mother_mobile"
                                                value={info.mother_mobile}
                                                onChange={handleChange}
                                                icon={<DeviceMobileIcon className="h-5 text-gray-400 px-3 group-hover:text-eve-blue-700 transition duration-200 absolute"/>}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Email Address"
                                                name="mother_email"
                                                value={info.mother_email}
                                                onChange={handleChange}
                                                icon={<MailIcon className="h-5 text-gray-400 px-3 group-hover:text-eve-blue-700 transition duration-200 absolute"/>}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Landline"
                                                name="mother_landline"
                                                value={info.mother_landline}
                                                onChange={handleChange}
                                                icon={<PhoneIcon className="h-5 text-gray-400 px-3 group-hover:text-eve-blue-700 transition duration-200 absolute"/>}
                                                hasLabel
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-lg text-gray-600 mb-2 mx-auto font-medium block border-t pt-8 sm:px-14 px-8">Father</h1>
                                    <div className="grid grid-cols-12 gap-x-3 sm:px-14 px-8 pb-8">
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="First Name"
                                                name="father_firstName"
                                                value={info.father_firstName}
                                                onChange={handleChange}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Last Name"
                                                name="father_lastName"
                                                value={info.father_lastName}
                                                onChange={handleChange}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Middle Name"
                                                name="father_middleName"
                                                value={info.father_middleName}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                type="date"
                                                placeholder="Birthdate"
                                                name="father_birthdate"
                                                value={info.father_birthdate}
                                                onChange={handleChange}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-8 col-span-12">
                                            <AuthInput
                                                placeholder="Educational Attainment"
                                                name="father_education"
                                                value={info.father_education}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <AuthInput
                                                placeholder="Company"
                                                name="father_company"
                                                value={info.father_company}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <AuthInput
                                                placeholder="Designation"
                                                name="father_designation"
                                                value={info.father_designation}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Mobile Number"
                                                name="father_mobile"
                                                value={info.father_mobile}
                                                onChange={handleChange}
                                                icon={<DeviceMobileIcon className="h-5 text-gray-400 px-3 group-hover:text-eve-blue-700 transition duration-200 absolute"/>}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Email Address"
                                                name="father_email"
                                                value={info.father_email}
                                                onChange={handleChange}
                                                icon={<MailIcon className="h-5 text-gray-400 px-3 group-hover:text-eve-blue-700 transition duration-200 absolute"/>}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Landline"
                                                name="father_landline"
                                                value={info.father_landline}
                                                onChange={handleChange}
                                                icon={<PhoneIcon className="h-5 text-gray-400 px-3 group-hover:text-eve-blue-700 transition duration-200 absolute"/>}
                                                hasLabel
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-lg text-gray-600 mb-2 mx-auto font-medium block border-t pt-8 sm:px-14 px-8">Guardian</h1>
                                    <div className="grid grid-cols-12 gap-x-3 sm:px-14 px-8 pb-8">
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="First Name"
                                                name="guardian_firstName"
                                                value={info.guardian_firstName}
                                                onChange={handleChange}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Last Name"
                                                name="guardian_lastName"
                                                value={info.guardian_lastName}
                                                onChange={handleChange}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Middle Name"
                                                name="guardian_middleName"
                                                value={info.guardian_middleName}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                type="date"
                                                placeholder="Birthdate"
                                                name="guardian_birthdate"
                                                value={info.guardian_birthdate}
                                                onChange={handleChange}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-8 col-span-12">
                                            <AuthInput
                                                placeholder="Educational Attainment"
                                                name="guardian_education"
                                                value={info.guardian_education}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <AuthInput
                                                placeholder="Company"
                                                name="guardian_company"
                                                value={info.guardian_company}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <AuthInput
                                                placeholder="Designation"
                                                name="guardian_designation"
                                                value={info.guardian_designation}
                                                onChange={handleChange}
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Mobile Number"
                                                name="guardian_mobile"
                                                value={info.guardian_mobile}
                                                onChange={handleChange}
                                                icon={<DeviceMobileIcon className="h-5 text-gray-400 px-3 group-hover:text-eve-blue-700 transition duration-200 absolute"/>}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Email Address"
                                                name="guardian_email"
                                                value={info.guardian_email}
                                                onChange={handleChange}
                                                icon={<MailIcon className="h-5 text-gray-400 px-3 group-hover:text-eve-blue-700 transition duration-200 absolute"/>}
                                                required
                                                hasLabel
                                            />
                                        </div>
                                        <div className="md:col-span-4 col-span-12">
                                            <AuthInput
                                                placeholder="Landline"
                                                name="guardian_landline"
                                                value={info.guardian_landline}
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
                                                required
                                                hasLabel
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-80 w-full sm:px-14 p-8">
                                    <AuthSubmitBtn
                                        text="Update Information"
                                        loading={loading}
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
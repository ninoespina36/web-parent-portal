import _ from 'underscore';
import CryptoJS from 'crypto-js';

import Toast from './components/Toast';

export const displayErrors = (errors, title) =>{
    return (
        <div>
            <h5 className="text-sm font-bold">{title}</h5>
            <ul className="mt-3">
                {_.pairs(errors).map((item, index)=><li className="flex items-center mb-1" key={index}><span className="text-xs">&#8226; {item[1]}</span></li>)}
            </ul>
        </div>
    )
}

export const encryptData = data =>{
    return encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(data), 'EDULEARN TECHNOLOGIES').toString());
}

export const decryptData = data =>{
    try{
        let bytes = CryptoJS.AES.decrypt(decodeURIComponent(data), 'EDULEARN TECHNOLOGIES');
        let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    }catch(err){
        Toast.error('Something went wrong. Please try again later.');
        return false;
    }
}
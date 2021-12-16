import _ from 'underscore';
import CryptoJS from 'crypto-js';
import { confirmAlert as ConfirmAlert } from 'react-confirm-alert';

import Toast from './components/Toast';
import alarm from './images/icons/alarm.png';
import warning from './images/icons/warning.png';
import info from './images/icons/info.png';

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

export const showServerError = () =>{
    Toast.error('Something went wrong on the server. Please try again later.');
}

export const confirmAlert = ({ 
    title= null, 
    body= null, 
    btnText = null, 
    onClick = console.log('default'),
    type = 'primary' 
}) =>{

    const icon = type === 'warning' ? warning : type === 'error' ? alarm : info;

    ConfirmAlert({
        customUI: ({ onClose }) =>(
            <div className="bg-white p-8 rounded">
                <h1 className="font-medium text-xl mb-3 flex items-center">
                    <img 
                        className="w-5 mr-3"
                        src={icon}
                        alt="Error"
                    />
                    {title}
                </h1>
                {body}
                <div className="flex space-x-2 justify-end mt-3">
                    <button onClick={onClose} className="btn btn-ghost">Cancel</button>
                    <button onClick={() => { onClick(); onClose(); }} className={`btn btn-${type}`}>{btnText}</button>
                </div>
            </div>
        ),
        overlayClassName: "bg-gray-800 bg-opacity-50"
    });
}
import { toast } from 'react-toastify';

const Toast = {
    success(msg, options = {}) {
        return toast.success(msg, {
            ...options,
            // className: 'bg-green-700'
        });
    },
    
    error(msg, options = {}) {
        return toast.error(msg, {
            ...options,
            // className: 'bg-red-600'
        });
    },

    info(msg, options = {}) {
        return toast.info(msg, {
            ...options,
            // className: 'bg-blue-600'
        });
    },
};

export default Toast;
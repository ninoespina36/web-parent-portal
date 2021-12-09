import React from 'react';

export default function AuthBackBtn({ 
    text, 
    onClick, 
    loading = false, 
    className = null,
}){
    return (
        <button 
            type="button" 
            disabled={loading}
            className={`btn btn-secondary w-full block ${className}`}
            onClick={onClick}
        >{text}</button>
    )
}
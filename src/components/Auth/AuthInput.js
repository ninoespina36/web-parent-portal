import React from 'react';

export default function AuthInput({ 
    type = "text",
    icon = null, 
    placeholder = null, 
    hasLabel = false,
    name = null,
    className = null,
    containerClassName = null,
    required = false,
    value = '',
    onChange,
}){
    return (
        <div className="form-control w-full">
            {hasLabel && (
                <label className="label" htmlFor={name}>
                    <span className="label-text">{placeholder} {required && <span className="text-red-500">*</span>}</span>
                </label> 
            )}
            <div className={`flex items-center group relative ${containerClassName}`}>
                {icon}
                <input 
                    type={type}
                    className={`input input-bordered w-full ${!!icon && 'pl-10'} ${className}`}
                    name={name}
                    value={value}
                    onChange={onChange}
                    id={name}
                    placeholder={!hasLabel ? placeholder : ''}
                />
            </div>
        </div>
    )
}
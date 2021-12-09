import React from 'react';
import SelectBordered from '../SelectBordered';

export default function AuthSelect({
    options = [],
    placeholder = null,
    required = false,
    isLoading = false,
    hasError = false,
    onChange,
}){
    return (
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text">{placeholder} {required && <span className="text-red-800">*</span>}</span>
            </label> 
            <div className={`border rounded-lg ${hasError ? 'border-red-400' : 'border-gray-300'}`}>
                <SelectBordered
                    options={options} 
                    placeholder=""
                    onChange={onChange}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}
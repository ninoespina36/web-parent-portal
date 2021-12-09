import React from 'react';
import Select from 'react-select';

export default function SelectBordered(props){

    const customStyles = {
      dropdownIndicator: (provided, state) => ({
        ...provided,
        background: 'transparent',
        color: '#6b7280',
        border: 0,
      }),
      indicatorSeparator: (provided, state) => ({
        ...provided,
        background:  'transparent',
      }),
      indicatorsContainer: (provided, state) => ({
        ...provided,
        background:  'transparent',
        border: 0,
      }),
      loadingIndicator: (provided, state) => ({
        ...provided,
        background:  'transparent',
        border: 0,
      }),
      loadingMessage: (provided, state) => ({
        ...provided,
        fontSize: '0.875rem'
      }), 
      noOptionsMessage: (provided, state) => ({
        ...provided,
        fontSize: '0.875rem'
      }),
      input: (provided, state) => ({
        ...provided,
        background:  '#fff',
        fontSize: '0.875rem',
      }),
      placeholder: (provided, state) => ({
        ...provided,
        fontSize: '0.875rem',
        color: '#9CA3AF'
      }),
      option: (provided, state) => ({
        ...provided,
        background: state.isSelected ? '#e5e7eb' : 'white',
        color: 'black',
        fontSize: '0.875rem'
      }),
      singleValue: (provided, state) => ({
        ...provided,
        fontSize: '0.875rem'
      }),
      control: (provided, state) => ({
        ...provided,
        background: '#fff',
        borderRadius: 30,
        border: 0,
        boxShadow: 'none',
        padding: 5,
      }),
    }

    return(
        <Select {...props} styles={customStyles} />
    )
}
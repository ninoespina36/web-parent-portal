import React from 'react';
import { BeatLoader } from 'react-spinners';
import { css } from '@emotion/react';

export default function AuthSubmitBtn({ 
    text = null, 
    className = null,
    loading, 
}){
    return (
        <button 
            type="submit" 
            className={`btn btn-primary w-full block ${className}`}
            disabled={loading}
        >{ loading ? <BeatLoader size={10} color="#fff" css={css`display: block; margin: 0 auto;`}/> : text }</button>
    )
}
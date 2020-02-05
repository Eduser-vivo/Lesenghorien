import React from 'react';
import '../asset/form.css';
export const renderField = ({input, label, type, placeholder, meta:{error}}) =>{
    return(
        <div className="form-group">
                {label !== null && label !=='' && <label>{label} </label>}
                <input {...input} type={type} placeholder={placeholder} required autoComplete="off" className="form-control" />
        </div>
    );
}

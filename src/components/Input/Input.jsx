import {React, useRef} from "react";
import style from "./Input.module.css";


export const Input = ({ id, value, placeholder, label, column, required, onChange, onBlur, disabled, type, error}) => {
  return (
    <div className={style.inputItem} style={{ gridColumn: column}} >
      <label className={style.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={`${style.input} ${error ? style.inputError : ''}`}
        id={id}
        name={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        readOnly={disabled}
        type={type}
      />
      {error && <p style={{color: 'red'}}>{error}</p>}
      
    </div>
  );
};

import {React, useRef} from "react";
import style from "./Input.module.css";


export const Input = ({ id, value, label, column, required, onChange, disabled, type}) => {
  return (
    <div className={style.inputItem} style={{ gridColumn: column}} >
      <label className={style.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={style.input}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        readOnly={disabled}
        type={type}

      />
    </div>
  );
};

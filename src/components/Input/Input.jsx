import React from "react";
import style from "./Input.module.css";

export const Input = ({ id, label, type, name, value, onChange }) => {
  label = "nome";
  return (
    <div>
      <label className={style.label} htmlFor={id}>{label}</label>
      <input
        className={style.input}
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

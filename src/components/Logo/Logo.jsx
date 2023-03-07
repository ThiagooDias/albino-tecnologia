import style from "./Logo.module.css";

import React from 'react';
import logoImg from '../../assests/logo.png';

export function Logo() {
  return (
    <img src={logoImg} className={style.logo} alt="Logo" />
  );
}


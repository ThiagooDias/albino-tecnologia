import React from 'react'
import style from './BotaoContainer.module.css'

import { NavLink } from 'react-router-dom';

export const BotaoContainer = ({ children ,name, path,...rest } ) => {

    return (
    <NavLink to={path}  {...rest}>
        <div className={style.btn}>
            {children}
            {name}
        </div>
    </NavLink> 
  )
}


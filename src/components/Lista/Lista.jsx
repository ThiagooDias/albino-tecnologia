import React from "react";
import style from './Lista.module.css'
import { Link } from "react-router-dom";

export const Lista = ({lista, titulo, name}) => {
  console.log('lista ',lista)
  return (
    <div>
      <div className={style.Titulo}>
        <h1 className={style.Titulo}>{titulo}</h1>
      </div>
      <div className={style.ContainerList}>
        <ul className={style.Lista}>
          {lista.map((user) => (
            <li key={user.id}> 
              <Link className={style.Link} to={`${user.id}`}>
                {user[name]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

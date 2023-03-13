import React from "react";
import { Link } from "react-router-dom";
import style from "./VerUsuario.module.css";

export const VerUsuario = () => {
  const userList = [
    { id: "5555", name: "joao" },
    { id: "4444", name: "maria" },
    { id: "3333", name: "pedro" },
    { id: "5555", name: "Thiago Dias Teixeira" },
    { id: "5555", name: "Thiago Dias Teixeira" },
    { id: "5555", name: "Thiago Dias Teixeira" },
    { id: "5555", name: "Thiago Dias Teixeira" },
    { id: "5555", name: "Thiago Dias Teixeira" },
    { id: "5555", name: "Thiago Dias Teixeira" },
    { id: "5555", name: "Thiago Dias Teixeira" },
    { id: "5555", name: "Thiago Dias Teixeira" },
    { id: "5555", name: "Thiago Dias Teixeira" },
    { id: "5555", name: "Thiago Dias Teixeira" },
    { id: "5555", name: "Thiago Dias Teixeira" },
    { id: "5555", name: "Thiago Dias Teixeira" },
    { id: "5555", name: "Thiago Dias Teixeira" },
  ];
  return (
    <div>
      <div className={style.Titulo}>
        <h1 className={style.Titulo}>Lista de Usuários</h1>
      </div>
      <div className={style.ContainerList}>
        <ul className={style.Lista}>
          {userList.map((user) => (
            <li key={user.id}>
              <Link className={style.Link} to={`${user.id}`}>
                {user.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

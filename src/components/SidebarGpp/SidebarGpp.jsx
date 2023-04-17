import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import style from "./SidebarGpp.module.css";

import { MenuIcon } from "../../assests/icons/MenuIcon";
import { ClienteIcon } from "../../assests/icons/ClienteIcon";
import { ContratoIcon } from "../../assests/icons/ContratoIcon";
import { DashboardIcon } from "../../assests/icons/DashboardIcon";
import { FornecedorIcon } from "../../assests/icons/FornecedorIcon";
import { OsIcon } from "../../assests/icons/OsIcon";
import { ProjetoIcon } from "../../assests/icons/ProjetoIcon";
import { Logo } from "../Logo/Logo";
import { Logout } from "../Logout/Logout";

export const SidebarGpp = ({ children }) => {
  const [menuActive, setMenuActive] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    {
      path: "/gpp/dashboard",
      name: "Dashboard",
      icon: <DashboardIcon width={32} fill={"#fff"} />,
    },
    {
      path: "/gpp/contrato",
      name: "Contrato",
      icon: <ContratoIcon width={32} fill={"#fff"} />,
    },
    {
      path: "/gpp/projetos",
      name: "Projetos",
      icon: <ProjetoIcon width={32} fill={"#fff"} />,
    },
  ];

  return (
    <div className={style.container}>
      <div className={style.sidebar}>
        <div className={style.top_section}></div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={`${style.link} ${
              menuActive === item.name && style.active
            }`}
            onClick={() => setMenuActive(item.name)}
          >
            <div className={style.icon}>{item.icon}</div>
            <div className={style.link_text}>{item.name}</div>
          </NavLink>
        ))}
        <Logout />
      </div>
        <div className={style.topbar}>
          <Logo />
          <h1 className={style.textLogo}>Albino <br/> Tecnologia</h1>
        </div>
      <main style={{ padding: 0 }}>
        <Outlet />
      </main>
    </div>
  );
};

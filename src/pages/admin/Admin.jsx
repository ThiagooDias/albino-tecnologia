import style from "./Admin.module.css";
import { BotaoContainer } from "../../components/ContainerBotoes/BotaoContainer";
import { UserIcon } from "../../assests/icons/UserIcon";


export const Admin = () => {
  return (
      <div className={style.container}>
        <BotaoContainer
          name={"Cadastrar usuário"}
          path={"/admin/cadastrar-usuario"}
        >
          <UserIcon />
        </BotaoContainer>

        <BotaoContainer name={"Ver usuários"} path={"/admin/usuarios"}>
          <UserIcon />
        </BotaoContainer>
      </div>

  );
};

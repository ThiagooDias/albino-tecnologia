import { useNavigate } from "react-router-dom";

export function Login(userType, email, password) {
    navigate = useNavigate()
  // Verificar as credenciais e o tipo de usuário
  if (userType === "admin" && email === "admin@example.com" && password === "admin") {
    // Redirecionar o usuário para a rota de admin
    navigate("/admin")
  } else if (userType === "financeiro" && email === "financeiro@example.com" && password === "financeiro") {
    // Redirecionar o usuário para a rota financeiro
    navigate('/financeiro');
  } else {
    // Credenciais inválidas
    alert("Credenciais inválidas");
  }
}

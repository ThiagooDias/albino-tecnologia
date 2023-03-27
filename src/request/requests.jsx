const usuario = localStorage.getItem("username");
const password = localStorage.getItem("password");
import axios from "axios";

function gerarCredencialBase64(username, password) {
  var token = username + ":" + password;
  var hash = btoa(token); // codifica a string em Base64
  return "Basic " + hash; // adiciona o prefixo "Basic" e retorna a credencial
}
const credencial = gerarCredencialBase64(usuario, password);

// POST
export const postData = async (url, data) => {
  try {
    let dataJSON = JSON.stringify({
      data,
    });

    console.log(dataJSON)

    const config = {
      mode: "no-cors",
      method: "post",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: credencial,
      },
      data: dataJSON,
    };

    const response = await axios.request(config);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error
  }
};

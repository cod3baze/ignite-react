# next auth control

## Cookies

- armazena valores no browser/ssr, no formato key-value

- setar um valor nos cookies

  ex:

  ```ts
  /*
      undefined: context da requisicao.
      nextauth.token: nome/chave do cookie.
      token: valor do cookie.
      maxAge: quanto tempo o cookie vai ficar armazenado no browser.
      path: quais endereços da nossa aplicação vão ter acesso ao cookie.
    */
  setCookie(undefined, "nextauth.token", token, {
    maxAge: 60 * 60 * 24 * 30, // 1month
    path: "/", // todos endereços
  });

  // atualiza o headers de auth que foi setado na configuração do axios
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  ```

## Refresh token

- **interceptors**: permite realizar ações antes ou depois que uma request acontecer no Axios.

  - permite interceptar requisições e respostas.

  ex:

  ```ts
  import axios, { AxiosError } from "axios";

  // intercepta antes de uma requisição ser feita no backend
  api.interceptors.request;

  // intercepta depois que receber qualquel resposta de uma requisição no backend
  api.interceptors.response;

  /*
    receber 2 funções.
      - 1° o que fazer se a resposta for sucesso
      - 2° o que fazer se a resposta for error
  */
  api.interceptors.response.use(
    (response) => response, // apenas retorna a response
    (error: AxiosError) => {
      if (error.response.status === 401) {
        if (error.response.data?.code === "token.expired") {
          // refresh token
        } else {
          // LogOut the user
        }
      }
    }
  );
  ```

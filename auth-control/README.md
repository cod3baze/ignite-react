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

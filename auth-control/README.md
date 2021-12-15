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

- evitar error de requisições com token expired.

> sempre que o interceptor detectar que está sendo feito request com o token expired, ele vai _pausar_ as requests, até o token ser atualizado. depois vai ter que executar as requests pausadas, adicionando ás o token atualizado.

- ex:

```ts
if (!isRefreshing) {
  isRefreshing = true; // só vai atualizar 1 vez, até desatualizar dnv.

  api
    .post("/refresh", {
      refreshToken,
    })
    .then((response) => {
      const { token } = response.data;

      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });
      setCookie(
        undefined,
        "nextauth.refresh_token",
        response.data.refreshToken,
        {
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        }
      );

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      // chama novamente as request que deram error por causa do token
      failedRequestsQueue.forEach((request) => request.onSuccess(token));
      failedRequestsQueue = [];

      // parâmetros para fazer a request de novo
      const originalConfig = error.config;
    });
}
/*
  dentro do interceptors o axios só permite executar *async/await* com a class *Promise*.

  vamos add 2 funções na fila.

  1 - vai refazer o refresh token, com os parâmetros originais: originalConfig.

  2 - executa se acontecer algum erro na request de refresh token.
*/
return new Promise((resolve, reject) => {
  failedRequestsQueue.push({
    // caso o token seja atualizado, vai adicionar o novo token para cada função da FailedQueue.
    onSuccess: (token: string) => {
      originalConfig.headers["Authorization"] = `Bearer ${token}`;

      resolve(api(originalConfig)); // executa a {api(originalConfig)}. aguardando o código
    },
    onFailure: (error: AxiosError) => {
      reject(error);
    },
  });
});
```

### HOC

> função de ordem superior: função que pode receber uma função e executar essa função.

ex:

```ts
/*
  retorna uma função que vai ser passada no SSR.
*/
export function withSSRGuest(fn: GetServerSideProps) {
  return async (context: GetServerSidePropsContext) => {
    const cookies = parseCookies(context);

    if (cookies["nextauth.token"]) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }

    // executa a função recebida como argumento
    return await fn(context);
  };
}

/*
  getServerSideProps: espera como retorno uma função que vai ser executada no SSR.
*/

export const getServerSideProps: GetServerSideProps = withSSRGuest(
  async (context) => {
    return {
      props: {},
    };
  }
);
```

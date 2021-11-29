# Github Explorer

## Babel

basicamente converte o código para que todos os navegadores entendam.
ex: Novas features do JavaScript

converte o código _index.js_ e jogo no arquivo _bundle.js_:
`yarn babel src/index.js --out-file dist/bundle.js`

uso: instala as libs necessárias
`yarn add -D @babel/core @babel/cli @babel/preset-env`

libs:
`@babel/preset-env`: (extensão) identifica qual o ambiente a aplicação está sendo executada, para converter o código da melhor forma possível.

`@babel/preset-react`: converte o código JSX (react)

## webpack

muito utilizado em conjunto com o Babel. faz uma série de configurações que vão "_ensinar_" a aplicação como tratar determinados arquivos com base no tipo.
ex: importação de uma imagem, css... Converte arquivo **.SASS** para **.CSS**

```js
// vão ficar as configs do comportamento da aplicação.
module: {
  rules: [
    // regras para cada arquivo
    {
      test: /\.jsx$/, // verifica o tipo do arquivo
      exclude: /node_modules/, // nao vai aplicar a regra nesse arquivo
      use: "babel-loader", // converte o arquivo *.jsx* usando essa lib. integra o babel eo webpack.
    },
  ];
}
```

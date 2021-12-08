# dash.go

## chakra-ui

> biblioteca de interface

construída por volta do _emotion_

- install: `yarn add @chakra-ui/react @chakra-ui/core @emotion/react @emotion/styled framer-motion`

- files:
  - `theme.ts`: onde as configurações de fonts padrões podem ser alteradas.
  - `config.ts`: sadfd

```ts
/*
  * reaproveita os styles que o chakra já tem e substitui.
*/
export const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: ''
      }
    }
  }
})

// resetCSS: remove configs padrões do HTML. ex: margin,padding...
<ChakraProvider resetCSS theme={theme}>
  <Component {...pageProps} />
</ChakraProvider>

/*
  * xs: 24px
  * sm: 32px
  * md: 40px
  * lg: 48px
*/
size="lg" // tamanhos pre definidos

// Serve para quando for criar uma pilha de elementos para dar espaçamento entre eles
<Stack spacing="4">
  <Input />
  <Input />
</Stack>
```

### NextJS

- fax processo de SSR nas rotas

- dynamic imports: evita que algo carregue antes do browser carregar.

- ex:_apenas carrega depois de passar pelo servidor do next_

```ts
// lazy loading
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
```

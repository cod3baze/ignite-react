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

- Breakpoint

  - permite que os components sejam renderizado de acordo com o tamanho de tela

  - ex: aplica os tamanhos de acordo com a sequência de breakpoints

  ```ts
    /**
     * sm: "30em", -> +mobile
     * md: "480em", -> +tablet
     * lg: "62em", -> +desktop
     * xl: "80em",
     * 2xl: "80em",
    */

    // quando a tela chegar no tamanho **md** vai aplicar **3xl**
    // 2xl a partir disso: 3xl
    fontSize={["2xl", "3xl"]}
  ```

- useBreakpointValue: criar um valor baseado no tamanho da tela.

  - ex: retorna a cor **blue** se a tela estiver em **md**

  ```ts
  const textColor = useBreakpointValue({ base: "red", md: "blue" });

  return <Text color={textColor}>eliasallex</Text>;
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

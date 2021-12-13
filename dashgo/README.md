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

### Forms data

- controlled components: controlar os inputs através do estado
- uncontrolled components: formas de acessar o valor do input apenas no momento quando utilizar ele.
- ex: utilizando **Refs**

  ```ts
  const searchInputRef = useRef<HTMLInputElement>(null)

  /*
    * Quando o *elemento input* for construído em tela vai passar a *ref* dela para a variável *searchInputRef*
  */
  <Input ref={searchInputRef} />

  // acessa o valor da *searchInputRef*
  // programação Imperativa: diz exatamente o que fazer
  console.log(searchInputRef.current.value)
  ```

- **Refs**: usado para acessar um component de forma imperativa.

```ts
/*
 * só recebe o segundo argumento *Ref* por causa do *forwardRef*.
 */
const InputBase = ({ id, ...rest }: Interface, ref) => {
  return <div {...rest} ref={ref} />;
};

/**
// repassa a ref para o component filho.

 * vai repassar a *Ref* recebida como o segundo argumento do component filho (InputBase).
 *
 * essa *ref* vai ser colocada no component que vai ser controlada imperativamente.
 */
const FormInput = forwardRef(InputBase);

<FormInput ref={register} />;
```

### Data fetching

- busca de dados

- **ReactQuery**

  - Busca, cacheia e atualiza os dados na aplicação, tudo sem 'tocar no estado globals'

  ```ts
  /**
   * cache_key (users): chave para acessar o valor no cache
   * Function: função que vai retornar os valores a serem armazenados no cache
   */
  const query = useQuery(
    ["users", page], // vai permitir o refresh dos dados na tela
    async () => {
      const response = await fetch("http://localhost:3000/api/users");
      const data = await response.json();

      return data;
    },
    {
      staleTime: 1000 * 5, // durante 5 segundos vai ser fresh
    }
  );
  ```

  - usa a estratégia comum da web: Stale While Revalidate

    - obsoleto enquanto revalida
    - quando sai da página e volta, o ReactQuery exibe os dados em cache, mas ainda faz a requisição para ver se tem algo novo.

  - preFetch: busca os dados de maneira antecipada.

  ```ts
  async function handlePrefetchUser(userId: number) {
    // recebe as chaves do dados a ser buscado.
    // igual a função *useQuery*
    await queryClient.prefetchQuery(["user", userId], async () => {
      return api.data.users[userId];
    });
  }
  ```

  - mutations: permite criar alterar e deletar..

  ```ts
  /*
    dessa forma permite monitorar o estado da requisição
  */
  const createUser = useMutation(async ((user: CreateUserFormData) => {
    const response = api.post("/users", {
      user: {
        ...user
      }
    })

    return response
  }, {
    onSuccess: (data, variables) => {
      // invalida uma ou mais queries
      // para recarregar a lista de queries atualizada
      queryClient.invalidateQueries('users')

    // altera os dados do usuário no cache com determinada chave
      queryClient.setQueryData(['users', {id: variables.id}], data)
    }
  });

  await createUser.mutateAsync(values) // executa a função *createUser* de forma assíncrona
  ```

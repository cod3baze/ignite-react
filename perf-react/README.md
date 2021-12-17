# react performance

## renderização

- fluxo de comparar um component com a sua versão anterior para exibir a nova versão na tela.

  - formas de gerar nova renderização:

    - **pai para filho**

    ```tsx
    <Pai>
      <Filho />
    </Pai>
    ```

    - **Propriedade**

    ```tsx
    <Pai>
      <Filho title="" />
    </Pai>
    ```

    - **atualização nos Hoocs: (useState, useEffect, useReducer)**

    ```tsx
    function Component() {
      const [state, setState] = useState();
    }
    ```

  - fluxo de renderização

  [X] 1 - Gerar uma nova versão do component que precisa ser exibido.
  [X] 2 - Comparar a nova versão com a anterior.
  [X] 3 - Se houveram alterações, o React **renderiza** essa nova versão em tela.

  - utiliza um algoritmo de _reconciliation_ (diffing): calcular a diferença entre duas estruturas.

### Memo

- evita com que o primeiro fluxo **[1]** aconteça caso nenhuma propriedade tenha sido alterada

  - usa _Shallow compare_: comparação rasa, verifica se os objetos estão ocupando a mesma posição na memória.

  - **useCases:**

    - 1. Pure Funcional Components: dado os mesmos parâmetros sempre retornam o mesmo resultado.
    - 2. Renders too often.
    - 3. Re-renders with same props.
    - 4. Medium to big size.

### useMemo

- _evitar_ que algo que _ocupe muito processamento_ seja **refeito/recalculado** em toda renderização

  - ex:

  ```ts
  /*
   * totalPrice só é recalculado se o *results* mudar.
   */
  const totalPrice = useMemo(() => {
    return results.reduce((total, product) => total + product.price, 0);
  }, [results]);
  ```

  - igualdade referencial: verifica se dois objetos ocupam a mesma posição na memória.

  - **useCases:**

  - 1. Cálculos pesados
  - 2.  Igualdade referencial ( Quando aquela informação é repassada ao component filho):

    ```tsx
    function APP() {
      const totalPrice = useMemo(() => {
        return results.reduce((total, product) => total + product.price, 0);
      }, [results]);

      return <Component totalPrice={totalPrice} />;
    }
    ```

### useCallback

> parecido com o [useMemo](#useMemo)

- utilizado apenas em uma situação: memorizar uma função, e não um valor.

  - ex: quando for passada para outro component.

  ```tsx
  function APP() {
    const onAddToWishList = useCallback(
      async (id: number) => {
        console.log("added: " + id);
      },
      [] // qualquer informação do component *APP* que foi utilizado
    );

    return <ComponentPai onAddToWishList={onAddToWishList} />;

    function ComponentFilho({ onAddToWishList }) {
      return <ComponentSibling onClick={() => onAddToWishList(product.id)} />;
    }
  }
  ```

### use

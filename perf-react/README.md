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

# TypeScriptLess

> "Não é porque você usa TypeScript que seu código está tipado, e o inverso também é verdade." Eu mesmo

Sou fã demais do TypeScript, ele mudou muito a forma como escrevo meu código. Hoje em dia, mesmo sem ele, meu código é melhor do que antes de conhecer o TypeScript, pois ele mudou a minha forma de ver o código e os tipos.

Apesar do JavaScript não ser uma linguagem tipada, ela possui tipos.

Os tipos primitivos:

- Boolean — true ou false
- Null — valor nulo
- Undefined — sem valor
- Number — inteiros, decimais...
- String — texto
- Symbol — chaves (keys)

Tipos função:

- Function (RegExp, Error, Array)
- Class

Tipo objeto (instâncias das funções)

- new Error
- new RegExp
- [] - arrays
- {} - objetos
- new Number

Aqui o number entra como objeto, isso porque usamos a classe Number para instanciar ele.

## Exercício mental 1

Se um objeto é uma instância de alguma classe, logo, o tipo daquele objeto é aquela classe. Se o JavaScript tem classes e objetos, logo ele tem tipos.

### typeof

O typeof é usado para ver tipos primitivos. Se executar no console do navegador `typeof 20`, vai retornar "number".

### instanceof

Para tipos vindos de construtores usa-se esse cara. No console se botar `new Error instanceof Error` vai retornar `true`.

Como vimos tanto no typeof como no instanceof da para ver os tipos, então, por mais que a linguagem não exija que uma tipagem declarada pelo dev, por debaixo dos panos tudo tem tipo.

## Tipagem no JS

Agora vamos indo do mais fácil e comum para ir entendo o TypeScript e ir tipando nosso JavaScript.

### Os tipos any e object

Vocês que mexem com TypeScript já devem ter visto algumas vezes o tipo `any`, esse cara significa "qualquer tipo", pensa nele como o pai de todos os tipos, tudo é any, e quando não tipamos os valores, implicitamente é um any, a não ser que o tipo esteja inferido no valor ou na instância, como já mostrado. O tipo object é aquele que aparece quando fazemos `typeof` de qualquer instância sempre vem `object`. Agora temos 2 tipos já, um `any` pra todos os tipos e `object` que "estende" `any` e serve para todas instâncias. Até agora ta assim:

| any    | any    | any    | any          | any    |
|--------|--------|--------|--------------|--------|
| number | string | object | object       | object |
|        |        |        | `Array<any>` | Node   |

Tudo é any, as instâncias são ou só object, ou são algum tipo mais específico. Certo, agora vamos seguir o plano desse documento de fazer uma boa tipagem, ou seja, quanto mais genérico melhor. Os tipos primitivos já foram resolvidos, agora as instâncias algumas já conseguimos melhorar, porém olha como apareceu um "any" no tipo dos dados do Array, e outra coisa é o Node, se for um input ele recebe atributos diferentes de um button, então não poderia ser um tipo tão genérico. Para resolver isso vamos para o próximo capítulo.
  
## Fazendo uma tipagem gradual no JS

### Nomenclatura

Como eu disse, o tipo pode ir além de uma linguagem tipada, o nome da variável é importante para saber o conteúdo (Clean Code). Não vou me aprofundar aqui, mas vou deixar alguns exemplos:

- name (string)
- isValid - boolean
- verifyIsValid - function that returns boolean)
- getPostByName - function getPostByName(name: string): Post
- publishDate - Date
- quantityOfShoes - number

### Tipo inferido

O tipo inferido é uma forma de dizer o tipo de uma variável sem ter que explicitamente fazer isso. Alguns exemplos:

- 5 - tipo: number
- new Error - tipo: Error
  
Qual a grandeza disso? É que são tipos que não precisamos fazer nada, só codar como já codamos e nosso editor de texto já vai saber como ligar com aqueles valores.

### Classes

### Extensões

### JSDoc
  
Vimos no capítulo anterior que as instâncias nem sempre chegam no nível de especificidade que queremos. Primeiro falando da hierarquia completa do Node até o HTMLInputElement.

- Node
- Element
- HTMLElement
- HTMLInputElement

O JavaScript por baixo dos panos usa essas classes, porém não podemos usá-las nos nossos códigos, então elas são consideradas Interfaces, pois não são instanciáveis.

---

Acho que tem coisas que da para fazer parecido com o TypeScript.

```js
enum enumGender {
  MALE,
  FEMALE
}

const enumGender = {
  MALE: : 0,
  FEMALE: 0  
}
```

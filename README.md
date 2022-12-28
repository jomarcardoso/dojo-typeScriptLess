[ver apresentação](https://jomarcardoso.github.io/dojo-typeScriptLess/#1)

Ainda pode ser preciso programar direto no JavaScript, ou então é mais fácil do que incluir um build de TypeScript, então é bom entender como podemos ter um código mais "tipado" no JavaScript.

# TypeScriptLess

> "Não é porque você usa TypeScript que seu código está tipado, e o inverso também é verdade." Eu mesmo

Sou fã demais do TypeScript, ele mudou muito a forma como escrevo meu código. Hoje em dia, mesmo sem ele, meu código é melhor do que antes de conhecer o TypeScript, pois ele mudou a minha forma de ver o código e os tipos.

Acredito que um aprendizado evolui outro, se você aprendeu muito bem TypeScript verá que seu código JavaScript evoluiu e se você ficar um tempo escrevendo JavaScript, verá coisas boas, mais simples talvez, que você pode levar para o TypeScript.

O JavaScript é uma linguagem fracamente tipada, mas obviamente, como toda linguagem, ela [possui tipos](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures).

Os tipos primitivos:

- boolean — true ou false
- null — valor nulo
- undefined — sem valor
- number — inteiros, decimais...
- string — texto
- [symbol — chaves (keys)](https://developer.mozilla.org/en-US/docs/Glossary/Symbol)
- [bigint](https://developer.mozilla.org/en-US/docs/Glossary/BigInt)

Tipos função:

- Function (RegExp, Error, Array)
- Class

Tipo objeto (instâncias das funções)

- new Error
- new RegExp
- [] - arrays
- {} - objeto (notação literal)
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

Quem usa o TypeScript não quer mais voltar para o JavaScript, isso pois a segurança da tipagem nos torna mais eficientes conforme o projeto cresce.

A proposta aqui é ir melhorando a escrita do nosso JavaScript e com auxílio do editor de texto VS Code termos um código tipado na medida do possível.

### Tipos primitivos e instâncias

O JavaScript nativamente tem classes e essas classes podem ter herança

|            | 5      | 'test' | {}     | []     | el      | document.body   |
| ---------- | ------ | ------ | ------ | ------ | ------- | --------------- |
| typeof     | number | string | object | object | object  | object          |
| instanceof |        |        | Object | Object | Object  | Object          |
| instanceof |        |        |        | Array  | Node    | Node            |
| instanceof |        |        |        |        | Element | Element         |
| instanceof |        |        |        |        |         | HTMLElement     |
| instanceof |        |        |        |        |         | HTMLBodyElement |

Todos estes são `true`

- `typeof document.body === 'object'`
- `document.body instanceof Object`
- `document.body instanceof Node`
- `document.body instanceof Element`
- `document.body instanceof HTMLElement`
- `document.body instanceof HTMLBodyElement`

### O tipo any

Vocês que mexem com TypeScript já devem ter visto algumas vezes o tipo `any`, esse cara significa "qualquer tipo", pensa nele como o pai de todos os tipos e quando não tipamos os valores, implicitamente é um `any`, pois qualquer tipo estende ele. Por exemplo o tipo `Object` é aquele que aparece quando fazemos `typeof` de qualquer instância. Agora temos 2 tipos já, um `any` pra todos os tipos e `Object` que "estende" `any` e serve para todas instâncias. Essa mesma lógica para todos os tipos primitivos e funções. Veja a tabela abaixo:

|            | 5      | 'test' | {}     | []           | el      | document.body   |
| ---------- | ------ | ------ | ------ | ------------ | ------- | --------------- |
| TypeScript | any    | any    | any    | any          | any     | any             |
| JavaScript | number | string | Object | Object       | Object  | Object          |
| JavaScript |        |        |        | Array        | Node    | Node            |
| JavaScript |        |        |        |              | Element | Element         |
| JavaScript |        |        |        |              |         | HTMLElement     |
| JavaScript |        |        |        |              |         | HTMLBodyElement |
| TypeScript | number | string | object | `Array<any>` | Element | HTMLBodyElement |

Tudo é `any`, as instâncias são só object, ou são algum tipo mais específico. Certo, agora vamos seguir o plano desse documento de fazer uma boa tipagem, ou seja, quanto menos genérico melhor. Os tipos primitivos já foram resolvidos, agora as instâncias algumas já conseguimos melhorar, porém olha como apareceu um "any" no tipo dos dados do Array, e outra coisa é o Node, se for um input ele recebe atributos diferentes de um button, então não poderia ser um tipo tão genérico. Para resolver isso vamos para o próximo capítulo.

## Fazendo uma tipagem gradual no JS

### Nomenclatura

Como eu disse, o tipo pode ir além de uma linguagem tipada, o nome da variável é importante para saber o conteúdo (Clean Code). Não vou me aprofundar aqui, mas vou deixar alguns exemplos:

- name: `string`
- isValid: `boolean`
- verifyIsValid: `function verifyIsValid(any: any): boolean`
- getPostByName: `function getPostByName(name: string): Post`
- publicationDate: `Date`
- quantityOfShoes: `number`

Por contexto, não é necessário reforçar a nomenclatura, inclusive segundo o Clean Code é um erro.

**errado:**

```js
class Person {
  constructor(name = '') {
    this.personName = name;
  }
}
```

**certo:**

```js
class Person {
  constructor(name = '') {
    this.name = name;
  }
}
```

```js
function copyElTextToOtherEl(toCopy, toPaste) {
  toPaste.innerText = toCopy.innerText;
}
```

```js
function getPeopleByName(name = '') {
  return Db.find('people', name);
}
```

### Tipo inferido

O tipo inferido é uma forma de dizer o tipo de uma variável sem ter que explicitamente fazer isso. Alguns exemplos:

- `5` - tipo: number
- `new Error` - tipo: Error

Qual a grandeza disso? É que são tipos que não precisamos fazer nada, só codar como já codamos e nosso editor de texto já vai saber como ligar com aqueles valores.

```js
const tvScreenInchesSize = 32;
const tvScreenSize = `${tvScreenInchesSize}"`;
```

```js
function announceError(error = new Error()) {
  alert(error.message);
}
```

### Classes

Tanto as classes como as funções podem exercer a função de "forma" para os objetos em JS. Quando se usa classe, o objeto instanciado a partir dela é literalmente daquele "tipo", uma instância de Cat é do tipo Cat. Na função isso é informal, mas funciona também.

```js
class Cat {
  color = '';

  constructor(color = '') {
    this.color = color;
  }

  sleep() {
    console.log(`${this.color} cat sleeping`);
  }
}

const blackCat = new Cat('black');

blackCat.sleep(); // black cat sleeping
```

```js
function createCat(color = '') {
  function sleep() {
    console.log(`${color} cat sleeping`);
  }

  return {
    color,
    sleep,
  };
}

const grayCat = createCat('gray');

grayCat.sleep(); // gray cat sleeping
```

### Interfaces

> "Uma interface é uma classe abstrata com todos os seus métodos abstratos." Alguém que eu não lembro

O código abaixo é só uma ideia louca, não recomendo.

```js
/**
 * @abstract
 */
class Admin {
  constructor() {
    if (this.constructor == Admin) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  /**
   * @abstract
   */
  toPost(blog, title = '', description = '', type = POST_TYPE.economy) {
    throw new Error('Method must be implemented.');
  }
}
```

## Objetos como Enum ou Union

```ts
type ShapeKind = 'CIRCLE' | 'SQUARE';

enum Gender {
  MALE,
  FEMALE,
}

enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}
```

```js
const Gender = {
  MALE: 1,
  FEMALE: 2,
};

class Pet {
  // precisa tipar os atributos
  name = '';
  gender = Gender.FEMALE;

  constructor(name = '', gender = Gender.FEMALE) {
    this.name = name;
    this.gender = gender;
  }
}

const chaminé = new Pet('Chaminé', Gender.MALE);
```

### Indo além da tipagem do JavaScript

### JSDoc

Até agora tudo que foi feito é JavaScript puro e o interpretador TypeScript do VS Code que auxilia mostrando os tipos.

Mas o TypeScript vai além na tipagem de JavaScript usando o JSDoc para definir tipos. [Veja a documentação do TypeScript sobre JSDoc](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

```js
/**
 * @param {HTMLElement} target - Elemento a ser verificado
 */
function isElAboveTheScreen(target) {
  return target.scrollHeight > target.offsetHeight;
}
```

### Definition Types

Arquivos `.d.ts`.

[GitHub DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)

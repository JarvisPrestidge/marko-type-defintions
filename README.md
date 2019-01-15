# Marko Type Definitions

![Language](https://img.shields.io/badge/language-TypeScript-blue.svg)
![Node Version](https://img.shields.io/badge/node-v.10.15.0-blue.svg)
![Yarn Version](https://img.shields.io/badge/yarn-v1.12.3-yellow.svg)
![Licence Info](https://img.shields.io/badge/license-MIT-brightgreen.svg)

<a href="https://communityinviter.com/apps/koa-js/koajs" rel="KoaJs Slack Community">![KoaJs Slack](https://img.shields.io/badge/Marko.js-Discord%20Channel-Slack.svg?longCache=true&style=for-the-badge)</a>

Unofficial marko js type definitions for typescript

* 🎉 First class Typescript support
* 👌 Complete support for all component props & methods
* ✨ Typings built while keeping intellisense support on all state / input objects


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Support](#support)
- [Contributing](#contributing)
- [Licence](#licence)
- [Author](#author)

## Installation

```bash
$ npm install --save-dev marko-type-definitions

...
```
```bash
$ yarn add -D marko-type-definitions

...
```

## Usage

```typescript
import { Marko } from "marko-type-defintions";

/**
 * Optional typed state 
 *
 * @interface IState
 */
interface IState {
    example: boolean;
};

/**
 * Optional typed input 
 *
 * @interface IInput
 */
interface IInput {
    example: boolean;
};

class Component extends Marko.Component<IState, IInput> {

    public onCreate(input: IInput) {
        this.state = {
            example: input.example,
        };
    }

    public onMount() {
        // Do something
    }

    ...
}

export = Component;
```

## Support

Please [open an issue](https://github.com/jarvisprestidge/marko-type-definitions/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/jarvisprestidge/marko-type-definitions/compare/).

## License

**MIT** : http://opensource.org/licenses/MIT

## Author

**Jarvis Prestidge** | <jarvisprestidge@gmail.com>

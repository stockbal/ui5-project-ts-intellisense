# Using TypeScript

> **Note**: Follow this [link](https://github.com/stockbal/ui5-project-ts-intellisense/tree/main) to show all available scenarios

This sample SAPUI5 projects demonstrates how to get intellisense with TypeScript supported by the UI5 task/middleware `ui5-tooling-transpile`.

## Setting up the project to support autocompletion for SAPUI5 types

### Create `tsconfig.json` in the root folder

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "skipLibCheck": true,
    "allowJs": true,
    "strict": true,
    "strictPropertyInitialization": false,
    "moduleResolution": "Node",
    "outDir": "./dist",
    "baseUrl": "./",
    "paths": { "shop/bookshop/*": ["./webapp/*"] },
    "types": ["@sapui5/types"]
  },
  "include": ["./webapp/**/*"]
}

```

The sample path `shop/bookshop/*` under `paths` has to be the application id in the `manifest.json`:

```json
{
  "_version": "1.65.0",
  "sap.app": {
    "id": "shop.bookshop"
  }
}
```

### Installing required npm packages

Install the following packages as dev dependencies (i.e. `npm i -D`)

- `ui5-tooling-transpile`
- `@sapui5/types`
- `typescript`

## Intellisense support

The intellisense level/support regarding UI5 is the same as with the [es6-javascript](https://github.com/stockbal/ui5-project-ts-intellisense/tree/es6-javascript) branch.

### Merging several files into one combined module

Because of the direct usage of TypeScript for the UI5 modules, we can now export the sub modules as extra types without using the kind of weird looking JSDoc syntax

```ts
// /app/bookshop/webapp/controller/main/crudHandlers.ts

import { IMainViewController } from "../MainView.controller";

export interface ICrudHandlers {
  onAdd(): void;
  onDelete(): void;
}

const crudHandlers: ICrudHandlers {
  onAdd(this: IMainViewController) { ... }
  onDelete(this: IMainViewController) { ... }
}

export default crudHandlers;
```

```ts
// /app/bookshop/webapp/controller/MainView.controller.ts

import crudHandlers, { ICrudHandlers } from "./main/crudHandlers";
...

/**
 * Combined type so sub modules have access to the full interface of the
 * main controller
 */
export type IMainViewController = MainViewController &
  ICrudHandlers &
  IChangeHandlers &
  ITokenHandlers &
  ITransactionHandlers;

/**
 * @alias shop.bookshop.controller.MainView
 */
class MainViewController extends Controller {
}

export default MainViewController;
```

### Use advantages of TypeScript

Aside from that you can use the full advantages that [TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html) brings with it.

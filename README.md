# Using ES6 modules syntax

> **Note**: Follow this [link](https://github.com/stockbal/ui5-project-ts-intellisense/tree/main) to show all available scenarios

This sample SAPUI5 projects demonstrates how to get intellisense support in VS Code via the help of `@sapui5/types` package ES6 module syntax supported by the UI5 task/middleware `ui5-tooling-transpile`.

## Setting up the project to support autocompletion for SAPUI5 types

### Create `jsconfig.json` in the root folder

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
    "paths": {
      "shop/bookshop/*": ["./webapp/*"]
    },
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

### Installing npm package `@sapui5/types`

This npm package has to be included in the dev dependencies of the `package.json` of the UI5 project. It's best to use the same version as the minimum UI5 version that the application should run on.

### Installing npm package `ui5-tooling-transpile`

This npm package has to be included in the dev dependencies of the `package.json` of the UI5 project. It will be used to transpile the `import`/`export` statements to proper `sap.ui.define` module syntax.

- [ui5-tooling-transpile](https://www.npmjs.com/package/ui5-tooling-transpile)
- [babel-plugin-transform-modules-ui5](https://github.com/ui5-community/babel-plugin-transform-modules-ui5)

## Intellisense support

Because of the ES6 module syntax it is no longer required to create separate `.d.ts` files to tell the compiler about the ui5 modules (see branch [sap-ui-define](https://github.com/stockbal/ui5-project-ts-intellisense/tree/sap-ui-define)).

You can just import your own modules as you do with the ones from UI5

```js
import models from "./model/models";
...

models.createDeviceModel();
```

An additional advantage is that you can navigate directly to the implementation of a module's method, rather than first being taken to the corresponding `.d.ts` file.

### Merging several files into one combined module

The merging is similar to the approach used in the `sap-ui-define` branch. But instead of just destructuring the imported sub modules into the object passed to the `.extend()` call, we are using `Object.assign()`:

```js
import changeHandlers from "./main/changeHandlers";
import crudHandlers from "./main/crudHandlers";
import tokenHandlers from "./main/tokenHandlers";
import transactionHandlers from "./main/transactionHandlers";
import BaseController from "./BaseController";

class MainViewController {
  ...
}

// merge sub modules into main controller
Object.assign(MainViewController.prototype, {
  ...crudHandlers,
  ...tokenHandlers,
  ...transactionHandlers,
  ...changeHandlers,
});

export default MainViewController;
```

Instead of using `.d.ts` files to provide a full interface for the controller, we are using the `@typedef` JSDoc tag to define the definitions of the sub modules and an intersection type to combine all sub modules together into one type for the controller.

> **Note**: The `.d.ts` file approach is also possible here. It is just a matter of taste at the end.

```js
// /app/bookshop/webapp/controller/main/crudHandlers.js
/**
 * @typedef {import('../MainView.controller').IMainViewController} IMainViewController
 */

/**
 * 
 * @typedef {{onAdd(): void; onDelete(): void;}} ICrudHandlers
 */
export default {
  /**
   * @this IMainViewController
   */
  onAdd() { ... }
  /**
   * @this IMainViewController
   */
  onDelete() { ... }
}
```

```js
// /app/bookshop/webapp/controller/MainView.controller.js

/**
 * Definition of compound type for full MainView.controller
 * @typedef {MainViewController & import('./main/crudHandlers').ICrudHandlers
 *                              & import('./main/tokenHandlers').ITokenHandlers
 *                              & import('./main/transactionHandlers').ITransactionHandlers
 *                              & import('./main/changeHandlers').IChangeHandlers
 *          } IMainViewController
 */

/**
 * @alias shop.bookshop.controller.MainView
 */
class MainViewController { ... }
```

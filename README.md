# Using classic approach with `sap.ui.define`

> **Note**: Follow this [link](https://github.com/stockbal/ui5-project-ts-intellisense/tree/main) to show all available scenarios

This sample SAPUI5 projects demonstrates how to get intellisense support in VS Code via the help of `@sapui5/types` package and own
type definition files.

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

## Using JSDoc to support intellisense

There are different areas where code completion can be added throughout the application code

### Module imports of `sap.ui.define`

`sap.ui.define()` are provided with two parameters, an array of strings, which represent the paths of the modules that the module depends on, and a callback function which receives the loaded modules as parameters. To have the loaded modules fully typed the following has to be done:

```js
sap.ui.define(
  ["sap/ui/model/json/JSONModel", "sap/ui/Device"],
  /**
   *
   * @param {typeof import('sap/ui/model/json/JSONModel').default} JSONModel
   * @param {import('sap/ui/Device').default} Device
   */
  (JSONModel, Device) => {

  // use the modules as needed
  }
);
```

If the import represents a Class, then you need to prefix the `import` statement with `typeof`, otherwise the TypeScript compiler will interpret the imported module as an instance of that type.

### Method parameters

Use the `@param` tag, the same way as with the callback function of `sap.ui.define`

### Variables and return values

The methods of the UI5 SDK often return only a base type from some method calls (e.g. `.getModel(): sap.ui.model.Model`). To cast the return values or the variable result to the correct type, the following options exist:

- Return values

  ```js
  const model = /** @type {ODataModel} */ (this.getView().getModel());
  ```

  > **Note**: Do not forget to wrap the method call or the statement you want to cast in parenthesis, otherwise the cast will not work correctly

- Declared variables (`const` or `let`)

  ```js
  // declare + assignment combined
  /** @type {ODataModel} */
  const model = this.getView().getModel();

  // separate declaration and assignment
  /** @type {ODataModel} */
  let model;

  model = this.getView().getModel();
  ```

### Reusing type imports

If you use a given type a lot in a file, you also have the option to declare the import as a Type Alias. This is best done at the beginning of a file.

e.g.

```js
/**
 * @typedef {typeof import('sap/m/Token').default} TokenType
 * @typedef {import('sap/m/Token').default} TokenInstance
 */
```

The keyword `typedef` basically defines a new type. But in hour case the definition is just imported from the UI5 type library. If you need both version of a class and also want to type the module import at `sap.ui.define` you give the types also an alias name.

```js
sap.ui.define(["sap/m/Token"], 
  /**
   * @param {TokenType} Token 
   */
  (Token) => {
    return {
        /**
         * @param {TokenInstance} token
         */
        onDeleteToken(token) {
          token.getKey(); // consieder as instance of sap.m.Token because

          const newToken = new Token(); // `Token` is considered as Class because of `typeof` 
        }
    };
  }
);
```

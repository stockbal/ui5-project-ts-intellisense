/**
 * @typedef {import('shop/bookshop/controller/MainView.controller').default} MainViewController
 */

sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/ColumnListItem",
    "./main/tokenHandlers",
    "./main/crudHandlers",
    "./main/transactionHandlers",
    "./main/changeHandlers",
  ],
  /**
   *
   * @param {typeof import('shop/bookshop/controller/BaseController').default} Controller
   * @param {typeof import('sap/ui/core/Fragment').default} Fragment
   */
  (Controller, Fragment, tokenHandlers, crudHandlers, transactionHandlers, changeHandlers) => {
    "use strict";

    return Controller.extend("shop.bookshop.controller.MainView", {
      /**
       * @this MainViewController
       */
      onInit() {
        this.deletedTokenPaths = [];
        this.salesTable = this.byId("idSalesTable");
        this.getView().bindObject({
          path: "/Books(guid'64959d98-af41-4bc8-853a-9a13636c598e')",
          parameters: { $expand: "sales", $select: "title,sales" },
        });
        this.rebindTable().then(() => {});
      },
      /**
       * @this MainViewController
       */
      async rebindTable() {
        if (!this.template) {
          this.template = await Fragment.load({ name: "shop.bookshop.fragment.SalesItem", controller: this });
        }
        this.salesTable.bindItems({ path: "sales", template: this.template, templateShareable: true });
      },
      // extend controller with additional handlers
      ...crudHandlers,
      ...tokenHandlers,
      ...transactionHandlers,
      ...changeHandlers,
    });
  },
);

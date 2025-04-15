/**
 * @typedef {import('sap/ui/core/mvc/Controller').default} Controller
 * @typedef {import('sap/m/MultiInput').default} MultiInput
 * @typedef {import('sap/ui/model/odata/v2/ODataListBinding').default} ODataListBinding
 * @typedef {import('sap/ui/model/odata/v2/ODataModel').default} ODataModel
 * @typedef {import('sap/m/Table').default} Table
 * @typedef {import('shop/bookshop/controller/MainView.controller').default} MainController
 * @typedef {import('sap/m/ColumnListItem').default} ColumnListItem
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
   * @param {typeof import('sap/ui/core/mvc/Controller').default} Controller
   * @param {typeof import('sap/ui/core/Fragment').default} Fragment
   * @param {typeof import('sap/m/ColumnListItem').default} ColumnListItem
   * @returns
   */
  (Controller, Fragment, ColumnListItem, tokenHandlers, crudHandlers, transactionHandlers, changeHandlers) => {
    "use strict";

    return Controller.extend("shop.bookshop.controller.MainView", {
      /** @type {ColumnListItem} */
      template: undefined,
      /**
       * @this MainController
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
       * @this MainController
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

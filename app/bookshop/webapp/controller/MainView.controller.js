import Fragment from "sap/ui/core/Fragment";
import changeHandlers from "./main/changeHandlers";
import crudHandlers from "./main/crudHandlers";
import tokenHandlers from "./main/tokenHandlers";
import transactionHandlers from "./main/transactionHandlers";
import BaseController from "./BaseController";

/**
 * @typedef {import('sap/m/ColumnListItem').default} ColumnListItem
 * @typedef {import('sap/m/Table').default} Table
 */

/**
 * @alias shop.bookshop.controller.MainView
 */
class MainViewController extends BaseController {
  /** @type {string[]} */
  deletedTokenPaths = [];
  other = {};
  /** @type {Table} */
  salesTable = undefined;
  /** @type {ColumnListItem} */
  template = undefined;
  onInit() {
    this.deletedTokenPaths = [];
    this.salesTable = /** @type {Table} */ (this.byId("idSalesTable"));
    this.getView()?.bindObject({
      path: "/Books(guid'64959d98-af41-4bc8-853a-9a13636c598e')",
      parameters: { $expand: "sales", $select: "title,sales" },
    });
    this.rebindTable().then(() => {});
  }
  async rebindTable() {
    if (!this.template) {
      this.template = await Fragment.load({ name: "shop.bookshop.fragment.SalesItem", controller: this });
    }
    this.salesTable?.bindItems({ path: "sales", template: this.template, templateShareable: true });
  }
}

// merge sub modules into main controller
Object.assign(MainViewController.prototype, {
  ...crudHandlers,
  ...tokenHandlers,
  ...transactionHandlers,
  ...changeHandlers,
});

export default MainViewController;

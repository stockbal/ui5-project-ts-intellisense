import Fragment from "sap/ui/core/Fragment";
import changeHandlers from "./main/changeHandlers";
import crudHandlers from "./main/crudHandlers";
import tokenHandlers from "./main/tokenHandlers";
import transactionHandlers from "./main/transactionHandlers";
import BaseController from "./BaseController";

/**
 * @typedef {import('sap/m/ColumnListItem').default} ColumnListItem
 * @typedef {import('sap/m/Table').default} Table
 *
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
class MainViewController extends BaseController {
  /** @type {string[]} */
  deletedTokenPaths = [];
  other = {};
  /** @type {Table} */
  salesTable = undefined;
  /** @type {ColumnListItem} */
  template = undefined;

  /**
   * @this IMainViewController
   */
  onInit() {
    this.deletedTokenPaths = [];
    this.salesTable = /** @type {Table} */ (this.byId("idSalesTable"));
    this.getView()?.bindObject({
      path: "/Books(guid'64959d98-af41-4bc8-853a-9a13636c598e')",
      parameters: { $expand: "sales", $select: "title,sales" },
    });
    this.rebindTable().then(() => {});
  }

  /**
   * @this IMainViewController
   */
  async rebindTable() {
    if (!this.template) {
      this.template = await Fragment.load({ name: "shop.bookshop.fragment.SalesItem", controller: this });
    }
    this.salesTable?.bindItems({ path: "sales", template: this.template, templateShareable: true });
    this.onNewToken();
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

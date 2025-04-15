import Fragment from "sap/ui/core/Fragment";
import Controller from "sap/ui/core/mvc/Controller";
import changeHandlers from "./main/changeHandlers";
import crudHandlers from "./main/crudHandlers";
import tokenHandlers from "./main/tokenHandlers";
import transactionHandlers from "./main/transactionHandlers";

/**
 * @typedef {import('sap/m/ColumnListItem').default} ColumnListItem
 * @typedef {import('sap/m/Table').default} Table
 */

class MainViewController extends Controller {
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

  // Option 1) Add methods directly in the class (supports autocompletion and navigation)
  onAdd = crudHandlers.onAdd;
  onDelete = crudHandlers.onDelete;
  onNewToken = tokenHandlers.onNewToken;
  onCancel = transactionHandlers.onCancel;
  onCustomSave = transactionHandlers.onCustomSave;
  onRefresh = transactionHandlers.onRefresh;
  onSave = transactionHandlers.onSave;
  onChanged = changeHandlers.onChanged;
  onTokenChange = changeHandlers.onTokenChange;
}

// Option 2) Extend controller with "foreign" methods after the actual class definition (supports autocompletion and navigation)
// --------------------------------------------------------------------------
// MainViewController.prototype.onAdd = crudHandlers.onAdd;
// MainViewController.prototype.onDelete = crudHandlers.onDelete;
// MainViewController.prototype.onNewToken = tokenHandlers.onNewToken;
// MainViewController.prototype.onCancel = transactionHandlers.onCancel;
// MainViewController.prototype.onCustomSave = transactionHandlers.onCustomSave;
// MainViewController.prototype.onRefresh = transactionHandlers.onRefresh;
// MainViewController.prototype.onSave = transactionHandlers.onSave;
// MainViewController.prototype.onChanged = changeHandlers.onChanged;
// MainViewController.prototype.onTokenChange = changeHandlers.onTokenChange;

// Option 3) Shortest merge of additional methods into the controller definition (does not support autocompletion right away)
// --------------------------------------------------------------------------
// Object.assign(MainViewController.prototype, {
//   ...crudHandlers,
//   ...tokenHandlers,
//   ...transactionHandlers,
//   ...changeHandlers,
// });

export default MainViewController;

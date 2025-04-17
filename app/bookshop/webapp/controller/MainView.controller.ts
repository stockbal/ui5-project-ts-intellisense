import ColumnListItem from "sap/m/ColumnListItem";
import Table from "sap/m/Table";
import Fragment from "sap/ui/core/Fragment";
import Controller from "sap/ui/core/mvc/Controller";
import changeHandlers, { IChangeHandlers } from "./main/changeHandlers";
import tokenHandlers, { ITokenHandlers } from "./main/tokenHandlers";
import transactionHandlers, { ITransactionHandlers } from "./main/transactionHandlers";
import crudHandlers, { ICrudHandlers } from "./main/crudHandlers";

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
  deletedTokenPaths: string[] = [];
  other = {};
  salesTable: Table;
  template: ColumnListItem;

  onInit() {
    this.deletedTokenPaths = [];
    this.salesTable = this.byId("idSalesTable") as Table;
    this.getView()?.bindObject({
      path: "/Books(guid'64959d98-af41-4bc8-853a-9a13636c598e')",
      parameters: { $expand: "sales", $select: "title,sales" },
    });
    this.rebindTable().then(() => {});
  }
  async rebindTable() {
    if (!this.template) {
      this.template = (await Fragment.load({
        name: "shop.bookshop.fragment.SalesItem",
        controller: this,
      })) as ColumnListItem;
    }
    this.salesTable?.bindItems({ path: "sales", template: this.template, templateShareable: true });
  }
}

Object.assign(MainViewController.prototype, {
  ...crudHandlers,
  ...tokenHandlers,
  ...transactionHandlers,
  ...changeHandlers,
});

export default MainViewController;


declare module "shop/bookshop/controller/MainView.controller" {
  import Table from "sap/m/Table";
  import Controller from "shop/bookshop/controller/BaseController";
  import ColumnListItem from "sap/m/ColumnListItem";
  import Token from "sap/m/Token";

  /**
   * Main Controller of the application
   * Note: Every method that needs to be accessed in any of the submodules of the class
   *       should be added here.
   *
   * WARNING: there is no sanity check agains the actual existing parameters, so they need to be kept
   *          in sync with webapp/controller/MainView.controller.js and its sub modules in main/
   */
  export default class MainViewController extends Controller {
    deletedTokenPaths: string[];
    salesTable: Table;
    template: ColumnListItem | undefined;
    rebindTable(): Promise<void>;
    onRefresh(): void;
    onSave(): void;
    onCancel(): void;
    onCustomSave(): void;
    onChanged(): void;
    onTokenChange(): void;
    onDeleteToken(token: Token): void;
    onAdd(): void;
    onDelete(): void;
  }
}

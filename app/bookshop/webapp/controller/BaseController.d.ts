declare module "shop/bookshop/controller/BaseController" {
  import ShopComponent from "shop/bookshop/Component";
  import Controller from "sap/ui/core/mvc/Controller";

  class BaseController extends Controller {
    /**
     * NOTE: allows intellisense to 
     * @returns the shop component
     */
    getOwnerComponent(): ShopComponent;
  }

  export default BaseController;
}

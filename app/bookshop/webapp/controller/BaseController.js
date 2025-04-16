import Controller from "sap/ui/core/mvc/Controller";

/**
 * @alias shop.bookshop.controller.BaseController
 */
export default class BaseController extends Controller {
  /**
   *
   * @returns {import('shop/bookshop/Component').default}
   */
  getOwnerComponent() {
    // simple override to adjust the type to BookshopComponent
    return super.getOwnerComponent();
  }
}

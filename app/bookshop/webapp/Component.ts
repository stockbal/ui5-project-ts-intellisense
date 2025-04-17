import UIComponent from "sap/ui/core/UIComponent";
import models from "./model/models";

/**
 * @alias shop.bookshop.Component
 */
export default class BookshopComponent extends UIComponent {
  public static metadata = { manifest: "json", interfaces: ["sap.ui.core.IAsyncContentCreation"] };

  init() {
    super.init();

    // set the device model
    this.setModel(models.createDeviceModel(), "device");

    // enable routing
    this.getRouter().initialize();
  }
}

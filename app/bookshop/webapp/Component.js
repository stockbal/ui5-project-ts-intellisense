sap.ui.define(
  ["sap/ui/core/UIComponent", "shop/bookshop/model/models", "shop/bookshop/controls/CustomInput"],
  /**
   *
   * @param {typeof import('sap/ui/core/UIComponent').default} UIComponent
   * @param {import('shop/bookshop/model/models').default} models
   */
  (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("shop.bookshop.Component", {
      metadata: { manifest: "json", interfaces: ["sap.ui.core.IAsyncContentCreation"] },

      init() {
        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments);
        // set the device model
        this.setModel(models.createDeviceModel(), "device");

        // enable routing
        this.getRouter().initialize();
      },
    });
  },
);

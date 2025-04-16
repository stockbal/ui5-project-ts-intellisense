sap.ui.define(
  ["sap/ui/model/json/JSONModel", "sap/ui/Device"],
  /**
   *
   * @param {typeof import('sap/ui/model/json/JSONModel').default} JSONModel
   * @param {import('sap/ui/Device').default} Device
   */
  (JSONModel, Device) => {
    "use strict";

    return {
      /**
       * Provides runtime information for the device the UI5 app is running on as a JSONModel.
       * @returns {JSONModel} The device model.
       */
      createDeviceModel: function () {
        const oModel = new JSONModel(Device);
        oModel.setDefaultBindingMode("OneWay");
        return oModel;
      },
    };
  },
);

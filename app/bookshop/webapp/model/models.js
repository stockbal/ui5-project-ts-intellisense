import JSONModel from "sap/ui/model/json/JSONModel";
import Device from "sap/ui/Device";

export default {
  /**
   * Provides runtime information for the device the UI5 app is running on as a JSONModel.
   * @returns {JSONModel} The device model.
   */
  createDeviceModel: function () {
    var oModel = new JSONModel(Device);
    oModel.setDefaultBindingMode("OneWay");
    return oModel;
  },
};

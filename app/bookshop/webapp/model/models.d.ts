declare module "shop/bookshop/model/models" {
  import JSONModel from "sap/ui/model/json/JSONModel";

  interface Models {
    createDeviceModel(): JSONModel;
  }

  const models: Models;
  export default models;
}

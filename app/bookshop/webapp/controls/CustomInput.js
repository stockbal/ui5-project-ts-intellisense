sap.ui.define(
  ["sap/m/Input", "sap/m/InputRenderer"],
  /**
   *
   * @param {typeof import('sap/m/Input').default} InputBase
   * @param {typeof import('sap/m/InputRenderer').default} InputBaseRenderer
   * @returns
   */
  (InputBase, InputBaseRenderer) => {
    const CustomInput = InputBase.extend("shop.bookshop.controls.CustomInput", {
      metadata: {},
      renderer: InputBaseRenderer,
    });

    CustomInput.prototype.init = function () {
      InputBase.prototype.init.call(this);
    };

    CustomInput.prototype.applySettings = function () {
      console.log("Settings for custom control:", JSON.stringify(arguments));
      InputBase.prototype.applySettings.apply(this, arguments);
    };

    CustomInput.prototype.onAfterRendering = function () {
      InputBase.prototype.onAfterRendering.call(this);

      console.log("Value", this.getValue());
    };

    return CustomInput;
  },
);

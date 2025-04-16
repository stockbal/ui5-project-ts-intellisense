/**
 * @typedef {import('sap/ui/model/odata/v2/ODataModel').default} ODataModel
 * @typedef {import('shop/bookshop/controller/MainView.controller').default} MainViewController
 */
export default {
  /**
   * @this MainViewController
   */
  onChanged(event) {
    console.log(event);
  },
  /**
   *
   * @param {import('sap/m/MultiInput').MultiInput$TokenUpdateEvent} event
   * @this MainViewController
   */
  onTokenChange(event) {
    const removedTokens = event.getParameter("removedTokens");
    removedTokens?.forEach((t) => {
      /** @type {ODataModel} */
      const model = this.getView().getModel();

      const context = t.getBindingContext();
      if (context?.bCreated) {
        model.deleteCreatedEntry(context);
      } else {
        this.deletedTokenPaths.push(context.getPath());
      }
    });
  },
};

/**
 * @typedef {import('shop/bookshop/controller/MainView.controller').default} MainViewController
 * @typedef {import('sap/m/MessageBox').default} MessageBox
 */
sap.ui.define(["sap/m/MessageBox"], (MessageBox) => {
  return {
    /**
     * @this MainViewController
     */
    onAdd() {
      this.getView()
        .getModel()
        .create(
          "sales",
          {},
          {
            context: this.getView().getBindingContext(),
            success: () => {
              console.log(this.salesTable.getItems());
            },
          },
        );
    },
    /**
     * @this MainViewController
     */
    onDelete() {
      const selectedContexts = this.salesTable.getSelectedContexts();
      if (!selectedContexts?.length) {
        MessageBox.error("No rows selected");
        return;
      }
      const model = this.getView().getModel();
      selectedContexts?.forEach((c) => {
        model.remove(c.getPath());
      });
    },
  };
});

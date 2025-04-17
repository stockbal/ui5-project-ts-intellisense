/**
 * @typedef {import('sap/ui/model/odata/v2/ODataModel').default} ODataModel
 * @typedef {import('../MainView.controller').IMainViewController} IMainViewController
 */

import MessageBox from "sap/m/MessageBox";

/**
 * @typedef {{onAdd(): void; onDelete(): void;}} ICrudHandlers
 */
export default {
  /**
   * @this IMainViewController
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
   * @this IMainViewController
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

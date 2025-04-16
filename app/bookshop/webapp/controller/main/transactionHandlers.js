/**
 * @typedef {import('sap/ui/model/odata/v2/ODataModel').default} ODataModel
 * @typedef {import('shop/bookshop/controller/MainView.controller').default} MainViewController
 */

export default {
  /**
   * @this MainViewController
   */
  onRefresh() {
    this.getView()?.getModel()?.resetChanges();
    this.getView()?.getModel()?.refresh(true, true);
    this.deletedTokenPaths.splice(0, this.deletedTokenPaths.length);
  },
  /**
   * @this MainViewController
   */
  onSave() {
    // delete all stored token paths
    this.deletedTokenPaths.forEach((p) => this.getView().getModel().remove(p));
    this.deletedTokenPaths.splice(0, this.deletedTokenPaths.length);
    this.getView().getModel().submitChanges();
  },
  /**
   * @this MainViewController
   */
  onCancel() {
    this.getView().getModel().resetChanges();
    this.deletedTokenPaths.splice(0, this.deletedTokenPaths.length);
  },
  /**
   * @this MainViewController
   */
  onCustomSave() {
    /** @type {ODataModel} */
    const model = this.getView().getModel();
    model.setDeferredGroups(["other"]);

    model.update(this.getView().getBindingContext().getPath(), { title: "other" });

    model.submitChanges({ groupId: "other" });
  },
};

import Event from "sap/ui/base/Event";
import MainViewController from "../MainView.controller";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import Context from "sap/ui/model/odata/v2/Context";

export interface ITransactionHandlers {
  onRefresh(event: Event): void;
  onSave(): void;
  onCancel(): void;
  onCustomSave(): void;
}

const transactionHandlers: ITransactionHandlers = {
  onRefresh(this: MainViewController, event: Event) {
    const model = this.getView()?.getModel() as ODataModel;
    model.resetChanges();
    model.refresh(true, true);
    this.deletedTokenPaths.splice(0, this.deletedTokenPaths.length);
  },
  onSave(this: MainViewController) {
    const model = this.getView()?.getModel() as ODataModel;
    // delete all stored token paths
    this.deletedTokenPaths.forEach((p) => model.remove(p));
    this.deletedTokenPaths.splice(0, this.deletedTokenPaths.length);
    model.submitChanges();
  },
  onCancel(this: MainViewController) {
    (this.getView()?.getModel() as ODataModel).resetChanges();
    this.deletedTokenPaths.splice(0, this.deletedTokenPaths.length);
  },
  onCustomSave(this: MainViewController) {
    const model = this.getView()?.getModel() as ODataModel;
    model.setDeferredGroups(["other"]);

    const context = this.getView()?.getBindingContext() as Context;
    model.update(context.getPath(), { title: "other" });

    model.submitChanges({ groupId: "other" });
  },
};

export default transactionHandlers;

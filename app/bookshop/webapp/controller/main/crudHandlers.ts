import MessageBox from "sap/m/MessageBox";
import Context from "sap/ui/model/odata/v2/Context";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import { IMainViewController } from "../MainView.controller";

export interface ICrudHandlers {
  onAdd(): void;
  onDelete(): void;
}

const crudHandlers: ICrudHandlers = {
  onAdd(this: IMainViewController) {
    this.onAdd();
    (this.getView()?.getModel() as ODataModel).create(
      "sales",
      {},
      {
        context: this.getView()?.getBindingContext() as Context,
        success: () => {
          console.log(this.salesTable.getItems());
        },
      },
    );
  },
  onDelete(this: IMainViewController) {
    const selectedContexts = this.salesTable.getSelectedContexts();
    if (!selectedContexts?.length) {
      MessageBox.error("No rows selected");
      return;
    }
    const model = this.getView()?.getModel() as ODataModel;
    selectedContexts?.forEach((c) => {
      model.remove(c.getPath());
    });
  },
};

export default crudHandlers;

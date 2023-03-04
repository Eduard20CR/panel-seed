import { IIosPanel } from "../../interfaces/models/panels/ios-config.interface";

export class IosPanelApp implements IIosPanel {
  constructor(public projectPath: string, public projectName: string, public brand: string) {}
}

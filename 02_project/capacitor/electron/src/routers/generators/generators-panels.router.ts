import { AngularPanelApp } from "../../models/panels/model.angular.panels";
import { GenerateAngularPanels } from "../../generators/panels/generator.angular.panels";

import { EnvPathHandler } from "../../helpers/envPathHandler";
import { Executer } from "../../helpers/executer";
import { IAngularPanel } from "../../interfaces/models/panels/angular-config.interface";

export const routerGenerateAngularPanel = async (_, { projectPath, projectName }: IAngularPanel) => {
  try {
    const angularPanelApp = new AngularPanelApp(projectPath, projectName, 2, 2, 2);
    const executer = new Executer(new EnvPathHandler());

    const angularApp = new GenerateAngularPanels(angularPanelApp, executer);
    await angularApp.runProject();
    return "Angular Panel Done";
  } catch (error) {
    throw error;
  }
};

export const routerGenerateCapacitorPanel = async (_) => {
  try {
    return "Capacitor Done";
  } catch (error) {
    throw error;
  }
};

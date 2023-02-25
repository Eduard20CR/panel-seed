import { AngularPanelApp } from "../../apps/panels/app.angular.panels";
import { GenerateAngularPanels } from "../../generators/panels/generator.angular.panels";
import { IAngularConfig } from "../../interfaces/angular-config.interface";
import { EnvPathHandler } from "../../shared/helpers/envPathHandler";
import { Executer } from "../../shared/helpers/executer";

export const routerGenerateAngularPanel = async (_, { projectName, projectPath }: IAngularConfig) => {
  try {
    const angularPanelApp = new AngularPanelApp(projectPath, projectName, 2, 2, 2);
    const executer = new Executer(new EnvPathHandler());

    const angularApp = new GenerateAngularPanels(angularPanelApp, executer);
    await angularApp.runProject();
    return "Panel Done";
  } catch (error) {
    throw error;
  }
};

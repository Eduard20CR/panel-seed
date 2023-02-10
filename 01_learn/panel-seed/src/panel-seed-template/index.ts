import { normalize } from "@angular-devkit/core";
import { apply, template, mergeWith, Rule, SchematicContext, strings, Tree, url, move, MergeStrategy } from "@angular-devkit/schematics";
import { PanelSeed } from "./panel-seed.interface";
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function panelSeed(_options: PanelSeed): Rule {
  return (_: Tree, _context: SchematicContext) => {
    // COPY TEMPLATES
    const sourceTemplate = url("./files");

    const sourceParametrizedTemplates = apply(sourceTemplate, [
      template({
        classify: strings.classify,
        dasherize: strings.dasherize,
        fontSize: 20,
        vh: 1080,
        vw: 1920,
        panelOrientation: "",
      }),
      move(normalize(`src/`)),
    ]);

    return mergeWith(sourceParametrizedTemplates, MergeStrategy.Overwrite);
  };
}

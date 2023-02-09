import { normalize } from "@angular-devkit/core";
import { apply, template, mergeWith, Rule, SchematicContext, strings, Tree, url, move } from "@angular-devkit/schematics";
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
        name: _options.name,
      }),
      move(normalize(`${_options.path}/`)),
    ]);

    return mergeWith(sourceParametrizedTemplates);
  };
}

import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics";
import { PanelSeed } from "./panel-seed.interface";
import { NodeDependency, NodeDependencyType, addPackageJsonDependency } from "@schematics/angular/utility/dependencies";
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function panelSeed(_options: PanelSeed): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // ADDING NODE DEPENDENCIES
    const dependencies: NodeDependency[] = [{ type: NodeDependencyType.Default, version: "5.2.3", name: "bootstrap" }];

    dependencies.forEach((dependency) => {
      addPackageJsonDependency(tree, dependency);
      _context.logger.log("info", `✅️ Added "${dependency.name}" into ${dependency.type}`);
    });

    return tree;
  };
}

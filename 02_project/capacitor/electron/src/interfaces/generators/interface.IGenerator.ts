import { Executer } from "../../shared/helpers/executer";

export interface IGenerator {
  _commandsToExec: string[];
  _executer: Executer;

  runCommands: () => void;
  addCommands: () => void;
  projectAlreadyExists: () => boolean;
  editFiles: () => void;
  runProject: () => void;
}

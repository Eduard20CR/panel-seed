import { dialog } from "electron";

export const routerGetDestinationFolder = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ["openDirectory"] });
  if (canceled) throw new Error("Somthing happened");

  return filePaths;
};

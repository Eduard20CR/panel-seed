const shelljs = require("shelljs");
const fs = require("fs");

const imagesFolderpath = "/Users/oscar.vasquez/Documents/03_web/2023/02_Chris_Juego_GIT/AAV-MythBusters-Game/angular/src/assets";

const paths = shelljs
  .find(imagesFolderpath)
  .filter((file: any) => {
    return file.match(/[\.png$|\.jpg$]/);
  })
  .filter((str: string) => str.toString().endsWith(".jpg") || str.toString().endsWith(".png"))
  .map((str: string) => {
    const pathToReplace = imagesFolderpath.replace("assets", "");
    return `'${str.replace(pathToReplace, "/")}'`;
  });
fs.writeFile("paths.txt", paths.toString(), (err: any) => {
  if (err) throw err;
  console.log("The file has been saved!");
});

const shelljs = require("shelljs");
const fs = require("fs");

const imagesFolderpath =
  "/Users/oscar.vasquez/Documents/03_web/2023/02_Chris_Juego_GIT/AAV-MythBusters-Game/angular/src/assets";

const paths = shelljs
  .find(imagesFolderpath)
  .filter(function (file) {
    return file.match(/[\.png$|\.jpg$]/);
  })
  .filter(
    (str) => str.toString().endsWith(".jpg") || str.toString().endsWith(".png") || str.toString().endsWith(".webp")
  )
  .map((str) => {
    const pathToReplace = imagesFolderpath.replace("assets", "");
    return `'${str.replace(pathToReplace, "/")}'`;
  });

fs.writeFile("paths.txt", paths.toString(), (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});

import { app } from "electron";
import path from "path";

const ENV_PATHS =
  "/Users/oscar.vasquez/.rvm/gems/ruby-2.7.6/bin:/Users/oscar.vasquez/.rvm/gems/ruby-2.7.6@global/bin:/Users/oscar.vasquez/.rvm/rubies/ruby-2.7.6/bin:/Users/oscar.vasquez/.nvm/versions/node/v16.15.0/bin:~/Applications/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/share/dotnet:~/.dotnet/tools:/Library/Apple/usr/bin:/Library/Frameworks/Mono.framework/Versions/Current/Commands:/Users/oscar.vasquez/.rvm/bin";
const PACKAGE_PATH = `"${path.join(app.getPath("appData"), "electron-panel-seed-maikos", "refence-package")}"`;

export { ENV_PATHS, PACKAGE_PATH };

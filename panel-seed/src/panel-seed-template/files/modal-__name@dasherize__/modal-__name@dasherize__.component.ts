import { Component } from "@angular/core";

@Component({
  selector: "app-<%= dasherize(name) %>",
  templateUrl: "./modal-<%= dasherize(name) %>.component.html",
  styleUrls: ["./modal-<%= dasherize(name) %>.component.scss"],
})
export class Modal<%= classify(name) %>AppComponent {
  title = "testing-schematics";
}

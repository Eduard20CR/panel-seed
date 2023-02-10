import { Directive, HostListener } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';
import { filter } from 'rxjs';
import { Location } from '@angular/common';

@Directive({
  selector: '[appTrackingLabels]'
})
export class TrackingLabelsDirective{

  path!: string;
  hideNames = false;
  divs:any = [];
  anchors:any= [];
  buttons:any=[];
  name_element:any;



  constructor(
    private location: Location, 
    private router: Router) {
  
  }
  ngOnInit(): void {
    this.calltags();
    this.router.events.pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
    .subscribe((val) => {
    this.calltags();
      if(this.hideNames){
        this.addDataTrackingStyle();
      }
    });
    this.name_element= document.getElementById("name-element");
  }

  calltags(){
    this.divs = document.getElementsByTagName("div");
    this.anchors = document.getElementsByTagName("a");
    this.buttons = document.getElementsByTagName("button");
  }

  removeDataTrackingStyle(){
    for(var i = 0; i < this.divs.length; i++){
      if(this.divs[i].closest("[data-tracking]")){
        this.divs[i].classList.remove("tracking-buttons");
        this.divs[i].classList.remove("tracking-button-hover");
      }else{
        this.divs[i].classList.remove("not-tracking-buttons");
      }
    }
    for(var i = 0; i < this.anchors.length; i++){
      if(this.anchors[i].closest("[data-tracking]")){
        this.anchors[i].classList.remove("tracking-buttons");
        this.anchors[i].classList.remove("tracking-button-hover");
      }
    }
    for(var i = 0; i < this.buttons.length; i++){
      if(this.buttons[i].closest("[data-tracking]")){
        this.buttons[i].classList.remove("tracking-buttons");
        this.buttons[i].classList.remove("tracking-button-hover");
      }
    }
  }

  addDataTrackingStyle(){
    for(var i = 0; i < this.divs.length; i++){
      if(this.divs[i].closest("[data-tracking]")){
        this.divs[i].classList.add("tracking-buttons");
      }else{
        this.divs[i].classList.add("not-tracking-buttons");
      }
    }
    for(var i = 0; i < this.anchors.length; i++){
      if(this.anchors[i].closest("[data-tracking]")){
        this.anchors[i].classList.add("tracking-buttons");
      }
    }
    for(var i = 0; i < this.buttons.length; i++){
      if(this.buttons[i].closest("[data-tracking]")){
        this.buttons[i].classList.add("tracking-buttons");
      }
    }
  }

  @HostListener('click', ["$event"]) 
  onClick(e: Event) {
   this.calltags();
    if(this.hideNames){
      this.addDataTrackingStyle();
    }
  }  

@HostListener('document:keydown.shift.S', ['$event'])
onKeyDown(e: any) {
  this.hideNames = !this.hideNames
  if(this.hideNames){
    this.addDataTrackingStyle();
  }else{
    this.removeDataTrackingStyle();
    this.name_element.classList.add("hidden");
  }
}

  @HostListener("mouseover", ["$event"])
  infoTrackItem(e: any) {
    if(this.hideNames){
    const trackItem: HTMLElement = e.target.closest("[data-tracking]");
    if (!trackItem) return;
    trackItem.classList.add("tracking-button-hover");
    this.name_element.innerText= trackItem.dataset["tracking"]!;
    this.name_element.classList.remove("hidden");
    }
  } 
  
  @HostListener("mouseout", ["$event"])
  infoTrackItem2(e: any) {
    const trackItem: HTMLElement = e.target.closest("[data-tracking]");
    if (!trackItem) return;
    trackItem.classList.remove("tracking-button-hover");
    this.name_element.classList.add("hidden");

  }

  

}

import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SlideControllerService implements OnInit {
  actualTab = '';
  // ***Dont repeat elements***
  navigationArray: any[] = ['', 'test1', 'test3', 'test2', 'test4'];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  //  MOVE TAB
  setActualTab(tabName: string) {
    this.actualTab = tabName;
  }

  getActualTab() {
    return this.actualTab;
  }

  previousSlide() {
    const position = this.navigationArray.indexOf(this.actualTab);
    const newTab = this.navigationArray[position - 1];

    if (position == 0) return;
    this.router.navigate([newTab]);
  }

  nextSlide() {
    const position = this.navigationArray.indexOf(this.actualTab);
    const newTab = this.navigationArray[position + 1];

    if (position == this.navigationArray.length - 1) return;
    this.router.navigate([newTab]);
  }
}

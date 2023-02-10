import { Directive, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreensaverService } from '../services/screensaver.service';

@Directive({
  selector: '[appGoToScreenSaver]',
})
export class GoToScreenSaverDirective implements OnInit {
  constructor(
    private router: Router,
    private screensaverService: ScreensaverService
  ) {}

  ngOnInit() {
    // this.router.navigate(['route you want to go when init']);
    this.router.navigate(['screensaver']);
  }

  // reset timer when:
  @HostListener('window:mousemove', ['$event']) onMouseMove() {
    this.screensaverService.restartTimer();
    this.screensaverService.restartTimerSS();
  }
  @HostListener('click', ['$event']) onMouseClick() {
    this.screensaverService.restartTimer();
    this.screensaverService.restartTimerSS();
  }
  @HostListener('document:keydown', ['$event']) onkeyPress() {
    this.screensaverService.restartTimer();
    this.screensaverService.restartTimerSS();
  }
  @HostListener('window:scroll', ['$event']) onScroll() {
    this.screensaverService.restartTimer();
    this.screensaverService.restartTimerSS();
  }
}

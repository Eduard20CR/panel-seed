import { Xliff } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subject, Subscription } from 'rxjs';
import { ModalsService } from './modals.service';

@Injectable({
  providedIn: 'root',
})
export class ScreensaverService {
  // delay for back to ss
  timer!: Subscription;
  timerSS!: Subscription;
  whenSSTimerEnds = new Subject<void>();
  delay: number = 120_000;
  screensaverPath = 'screensaver';

  // booleans to show options in ss
  screensaverActive = true;
  questionAnswered = false;
  multipleOptionAnswered = false;
  screenSelected = 0;

  constructor(private router: Router, private modalService: ModalsService) {}

  // method to go back ss
  backToSS(allowed: boolean = false) {
    if (this.screensaverActive || allowed)
      // this.router.navigate(['route you want to go when timer ends']);
      this.router.navigate([this.screensaverPath]);
  }

  // set options
  onScreensaverActive(bool: boolean) {
    this.screensaverActive = bool;
  }
  onQuestionAnswered(bool: boolean) {
    this.questionAnswered = bool;
  }
  onMultipleOptionAnswered(bool: boolean) {
    this.multipleOptionAnswered = bool;
  }
  onSelectedScreenSaver(pictureSelectedIndex: number) {
    this.screenSelected = pictureSelectedIndex;
  }

  // TIMER

  setTimerDelay(newDelay: number = 120000) {
    this.delay = newDelay;
  }
  startTimer() {
    if (!this.screensaverActive) return;
    this.timer = interval(this.delay).subscribe((e) => {
      this.router.navigate([this.screensaverPath]);

      this.modalService.onCloseAllModals();
    });
  }
  stopTimer() {
    if (this.timer) {
      this.timer.unsubscribe();
    }
  }
  restartTimer() {
    if (this.router.url == `/${this.screensaverPath}`) return;
    this.stopTimer();
    this.startTimer();
  }

  // TIMER INSIDE SCREENSAVER
  startTimerSS() {
    if (this.router.url == `/${this.screensaverPath}`)
      this.timerSS = interval(this.delay).subscribe((e) => {
        this.whenSSTimerEnds.next();
        this.modalService.onCloseAllModals();
        this.stopTimerSS();
      });
  }
  stopTimerSS() {
    if (this.timerSS) this.timerSS.unsubscribe();
  }
  restartTimerSS() {
    if (this.router.url == `/${this.screensaverPath}`) {
      this.stopTimerSS();
      this.startTimerSS();
    } else {
      this.stopTimerSS();
    }
  }
}

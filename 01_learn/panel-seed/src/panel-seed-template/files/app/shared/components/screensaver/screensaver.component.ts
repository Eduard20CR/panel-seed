import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ScreensaverService } from 'src/app/shared/services/screensaver.service';

@Component({
  selector: 'app-screensaver',
  templateUrl: './screensaver.component.html',
  styleUrls: ['./screensaver.component.scss'],
})
export class ScreensaverComponent implements OnInit {
  screenSaverDelay = 120_000;
  nextPage = 'tab-0';

  doYouWantOptions = false;

  multipleOption = false;
  arrOfScreenSavers = [
    'assets/images/shared/screensaverPic/ss1.jpg',
    'assets/images/shared/screensaverPic/ss2.jpg',
    'assets/images/shared/screensaverPic/ss3.jpg',
    'assets/images/shared/screensaverPic/ss4.jpg',
  ];
  screensaverImageUrl = 'assets/images/shared/screensaverPic/ss1.jpg';
  screensaverSelected = 0;

  // SCREENSAVER WITH VIDEO
  // @ViewChild('video', { static: true }) video!: ElementRef;
  // vid = {  url: '/assets/videos/shared/screensaver/screensaver.mp4',};

  // ------------------------------------------
  questionAnswered!: boolean;
  multipleOptionAnswered!: boolean;

  constructor(
    private screensaverService: ScreensaverService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.runScreensaverVideo();

    // Setting ss
    this.setDelaySS();
    this.screensaverService.stopTimer();
    this.getBooleansToShowSS();
  }

  goToPanel() {
    // start timer and navigate to panel home
    this.screensaverService.startTimer();
    this.router.navigate([this.nextPage]);
    this.screensaverService.stopTimerSS();
  }

  pictureSelected(pictureSelectedIndex: number) {
    // console.log(pictureSelectedIndex);
    // Get the selectec screensaver and store it in the service
    this.screensaverSelected = pictureSelectedIndex;
    this.screensaverImageUrl = this.arrOfScreenSavers[pictureSelectedIndex];
    this.screensaverService.onSelectedScreenSaver(pictureSelectedIndex);
  }

  // runScreensaverVideo() {
  //   this.video.nativeElement.muted = true;
  //   this.video.nativeElement.autoplay = true;
  //   this.video.nativeElement.loop = true;
  //   this.video.nativeElement.play();
  // }

  setDelaySS() {
    this.screensaverService.setTimerDelay(this.screenSaverDelay);
  }

  getBooleansToShowSS() {
    this.questionAnswered = this.screensaverService.questionAnswered;
    this.multipleOptionAnswered =
      this.screensaverService.multipleOptionAnswered;
    if (!this.multipleOption) {
      this.screensaverImageUrl =
        this.arrOfScreenSavers[this.screensaverSelected];
    } else {
      this.screensaverSelected = this.screensaverService.screenSelected;
      this.screensaverImageUrl =
        this.arrOfScreenSavers[this.screensaverSelected];
    }
  }
}

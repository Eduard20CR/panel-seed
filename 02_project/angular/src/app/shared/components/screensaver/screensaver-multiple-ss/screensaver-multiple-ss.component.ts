import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScreensaverService } from 'src/app/shared/services/screensaver.service';

@Component({
  selector: '[app-screensaver-multiple-ss]',
  templateUrl: './screensaver-multiple-ss.component.html',
  styleUrls: ['./screensaver-multiple-ss.component.scss'],
})
export class ScreensaverMultipleSsComponent implements OnInit {
  @Input() arrOfScreenSavers: any;
  @Output() pictureSelected = new EventEmitter<number>();
  questionAnswered = false;

  constructor(private screensaverService: ScreensaverService) {}

  ngOnInit(): void {}

  screenSaverSelected(screensaverIndex: number) {
    // hide question - store boolean on the service - emit selected screensaver
    this.questionAnswered = true;
    this.screensaverService.onMultipleOptionAnswered(true);
    this.pictureSelected.emit(screensaverIndex);
  }
}

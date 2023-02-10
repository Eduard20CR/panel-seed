import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreensaverService } from 'src/app/shared/services/screensaver.service';

@Component({
  selector: '[app-screensaver-option]',
  templateUrl: './screensaver-option.component.html',
  styleUrls: ['./screensaver-option.component.scss'],
})
export class ScreensaverOptionComponent implements OnInit {
  @Input() nextPage!: string;
  questionAnswered = false;

  constructor(
    private screensaverOption: ScreensaverService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  screensaverSelecIfWanted(activeScreensaver: boolean) {
    // hide question - store booleans on the service
    this.questionAnswered = true;
    this.screensaverOption.onQuestionAnswered(true);

    if (!activeScreensaver) {
      this.screensaverOption.onScreensaverActive(false);
      this.router.navigate([this.nextPage]);
    } else {
      this.screensaverOption.onScreensaverActive(true);
    }
  }
}

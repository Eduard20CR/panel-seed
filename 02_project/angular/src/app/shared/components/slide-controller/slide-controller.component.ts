import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SlideControllerService } from '../../services/slide-controller.service';

@Component({
  selector: '[app-slide-controller]',
  templateUrl: './slide-controller.component.html',
  styleUrls: ['./slide-controller.component.scss'],
})
export class SlideControllerComponent implements OnInit {
  constructor(
    private slideController: SlideControllerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe((event) => {
        const actualTab = this.router.url.replace('/', '');
        this.slideController.setActualTab(actualTab);
      });
  }

  nextSlide() {
    this.slideController.nextSlide();
  }
  previousSlide() {
    this.slideController.previousSlide();
  }
}

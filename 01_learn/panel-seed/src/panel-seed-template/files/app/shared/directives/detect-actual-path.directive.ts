import { Directive, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { SiblingsComunicationService } from '../services/siblings-comunication.service';

@Directive({
  selector: '[appDetectActualPath]',
})
export class DetectActualPathDirective implements OnInit {
  routerSubscription!: Subscription;

  constructor(
    private router: Router,
    private siblingsComunication: SiblingsComunicationService
  ) {}

  ngOnInit(): void {
    this.detectActualPath();
  }

  detectActualPath() {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.siblingsComunication.onEmitActualPath(event.url);
      });
  }
  // CODE TO BE COPIED IN YOU COMPONENT
  // onChangePath() {
  //   this.actualPath = this.router.url;
  //   this.pathSubscription = this.siblignComunication.emitActualPath.subscribe(
  //     (path) => (this.actualPath = path)
  //   );
  // }
}

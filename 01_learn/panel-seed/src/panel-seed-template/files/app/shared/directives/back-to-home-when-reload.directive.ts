import { Directive, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Directive({
  selector: '[appBackToHomeWhenReload]',
})
export class BackToHomeWhenReloadDirective implements OnInit {
  @Input() appBackToHomeWhenReload = 'home';

  constructor(private router: Router) {}

  ngOnInit() {
    // go to home when init
    this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe((event) => {
        if (event.id === 1 && event.url === event.urlAfterRedirects) {
          this.router.navigate([this.appBackToHomeWhenReload]);
        }
      });
  }
}

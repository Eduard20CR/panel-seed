import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SiblingsComunicationService } from 'src/app/shared/services/siblings-comunication.service';

@Component({
  selector: '[app-slides]',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
})
export class SlidesComponent implements OnInit {
  @Input() imgLink!: string;

  updatePathSubscription!: Subscription;

  // 2) generar variable
  isTab2 = false;

  constructor(private siblignsComunication: SiblingsComunicationService) {}

  ngOnInit(): void {
    this.getPathOnUpdate();
  }

  getPathOnUpdate() {
    this.showAndHideButtonsOnPathUpdate('/' + this.imgLink);
    this.updatePathSubscription =
      this.siblignsComunication.emitActualPath.subscribe((path) => {
        this.showAndHideButtonsOnPathUpdate(path);
      });
  }

  showAndHideButtonsOnPathUpdate(path: string) {
    // 3) Resetear variable
    this.resetAllTabs();

    // 4) Añadir condicional
    if (path.includes('/tab-2')) {
      this.isTab2 = true;
    }
  }

  resetAllTabs() {
    this.isTab2 = false;
  }

  ngOnDestroy(): void {
    this.updatePathSubscription.unsubscribe();
  }
}

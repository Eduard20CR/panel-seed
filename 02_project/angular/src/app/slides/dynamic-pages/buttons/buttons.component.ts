import { Xliff } from '@angular/compiler';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SiblingsComunicationService } from './../../../shared/services/siblings-comunication.service';

@Component({
  selector: '[app-buttons]',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent implements OnInit, OnDestroy {
  @Input() imgLink!: string;

  updatePathSubscription!: Subscription;

  // 2) generar variable
  isGeneral = false;
  isTab0 = false;
  isTab3 = false;

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
    if (path.includes('/screensaver')) {
      this.isGeneral = false;
    }
    if (path.includes('/tab-0')) {
      this.isGeneral = false;
      this.isTab0 = true;
    }
    if (path.includes('/tab-3')) {
      this.isTab3 = true;
    }
  }

  resetAllTabs() {
    this.isGeneral = true;
    this.isTab0 = false;
    this.isTab3 = false;
  }

  ngOnDestroy(): void {
    this.updatePathSubscription.unsubscribe();
  }
}

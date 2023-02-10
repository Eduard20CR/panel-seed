import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalsService } from '../../services/modals.service';
import { ScreensaverService } from '../../services/screensaver.service';

@Component({
  selector: '[app-modals]',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss'],
})
export class ModalsComponent implements OnInit, OnDestroy {
  modal1 = false;
  modal2 = false;
  onCloseAllModals!: Subscription;
  onGetModalsState!: Subscription;

  constructor(
    private modalService: ModalsService,
    private screensaverService: ScreensaverService
  ) {}

  ngOnInit(): void {
    this.loadStateOfModals();
    this.onSubscribeToSubjects();
  }

  toggleModal1(forceState?: boolean) {
    this.modal1 = forceState === undefined ? !this.modal1 : forceState;
    this.onEmitModalsState();
  }
  toggleModal2(forceState?: boolean) {
    this.modal2 = forceState === undefined ? !this.modal2 : forceState;
    this.onEmitModalsState();
  }

  // LOGIC
  loadStateOfModals() {
    this.modal1 = this.modalService.returnModalsState().modal1;
    this.modal2 = this.modalService.returnModalsState().modal2;
  }
  onSubscribeToSubjects() {
    this.onGetModalsState = this.modalService.sendStateOfModals.subscribe(
      (modalState) => {
        this.modal1 = modalState.modal1;
        this.modal2 = modalState.modal2;
      }
    );
  }
  onEmitModalsState() {
    this.modalService.onChangeModalState([
      { modal: 'modal1', state: this.modal1 },
      { modal: 'modal2', state: this.modal2 },
    ]);
  }
  ngOnDestroy(): void {
    this.onCloseAllModals.unsubscribe();
    this.onGetModalsState.unsubscribe();
  }
}

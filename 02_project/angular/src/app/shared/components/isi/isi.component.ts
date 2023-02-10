import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalsService } from '../../services/modals.service';
import { ScreensaverService } from '../../services/screensaver.service';
import { SiblingsComunicationService } from '../../services/siblings-comunication.service';
import { toggleModalInterface } from '../../utils/toggle-modal.interface';

@Component({
  selector: '[app-isi]',
  templateUrl: './isi.component.html',
  styleUrls: ['./isi.component.scss'],
})
export class IsiComponent implements OnInit, OnDestroy {
  isISIOpen = false;
  actualPath!: string;
  onCloseISI!: Subscription;
  onGetModalsState!: Subscription;
  pathSubscription!: Subscription;

  constructor(
    private modalService: ModalsService,
    private siblingsComunicationService: SiblingsComunicationService,
    private screensaverService: ScreensaverService
  ) {}
  ngOnInit(): void {
    this.loadStateOfISI();
    this.onSubscribeToSubjects();
    this.onChangePath();
  }

  toggleISI(forceState?: boolean) {
    this.isISIOpen = forceState === undefined ? !this.isISIOpen : forceState;
    this.onEmitISIState();
  }
  changeModalState(modalStateObject: toggleModalInterface[]) {
    this.modalService.onToggleModal(modalStateObject); // modalStateObject -> [{modal:String, state?:boolean}]
  }

  // LOGIC
  onChangePath() {
    this.pathSubscription =
      this.siblingsComunicationService.emitActualPath.subscribe(
        (path) => (this.actualPath = path)
      );
  }
  loadStateOfISI() {
    this.isISIOpen = this.modalService.returnModalsState().isi;
  }
  onSubscribeToSubjects() {
    this.onGetModalsState = this.modalService.sendStateOfModals.subscribe(
      (modalState) => {
        this.isISIOpen = modalState.isi;
      }
    );
  }
  onEmitISIState() {
    this.modalService.onChangeModalState([
      { modal: 'isi', state: this.isISIOpen },
    ]);
  }
  ngOnDestroy(): void {
    this.onCloseISI.unsubscribe();
    this.onGetModalsState.unsubscribe();
    this.pathSubscription.unsubscribe();
  }
}

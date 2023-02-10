import { Xliff } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { toggleModalInterface } from '../utils/toggle-modal.interface';
import { modalsInterface } from './../utils/modal.inteface';

@Injectable({
  providedIn: 'root',
})
export class ModalsService {
  isModalOpen = new Subject<any>();
  sendStateOfModals = new Subject<any>();

  modalsState: modalsInterface = {
    isi: false,
    modal1: false,
    modal2: false,
  };

  constructor() {}

  // RETURN
  returnModalsState(): modalsInterface {
    return this.modalsState;
  }

  // SUBJECTS
  onIsModalOpen() {
    const isOpen = Object.values(this.modalsState).some((value) => value);
    this.isModalOpen.next({ state: isOpen, model: this.modalsState });
  }
  onSendStateOfModals() {
    this.sendStateOfModals.next(this.modalsState);
    this.onIsModalOpen();
  }

  // TOGGLE
  onCloseAllModals() {
    let key: keyof modalsInterface;
    for (key in this.modalsState) {
      this.modalsState[key] = false;
    }
    this.onSendStateOfModals();
  }
  onChangeModalState(modalArr: toggleModalInterface[]) {
    // Component emits its state from inside
    this.setModalState(modalArr);
    this.onSendStateOfModals();
  }
  onToggleModal(modalArr: toggleModalInterface[]) {
    // Open a component from anywhere
    this.setModalTogglerState(modalArr);
    this.conditionsOfModals(modalArr);
    this.onSendStateOfModals();
  }
  conditionsOfModals(modalArr: toggleModalInterface[]) {
    // Conditions when you open a popUp
    modalArr.forEach(({ modal: modalName, state: modalsState }) => {
      // OPEN MODAL 1 AND MODAL 2 IS OPEN
      if (modalName === 'modal1' && this.modalsState.modal2 === true)
        this.modalsState.modal2 = false;
      // OPEN MODAL 2 AND MODAL 1 IS OPEN
      if (modalName === 'modal2' && this.modalsState.modal1 === true)
        this.modalsState.modal1 = false;
      // OPEN MODAL AND ISI IS OPEN
      if (
        (modalName === 'modal1' || modalName === 'modal2') &&
        this.modalsState.isi === true
      )
        this.modalsState.isi = false;
    });
  }

  // UTILS
  setModalState(modalArr: toggleModalInterface[]) {
    let key: keyof modalsInterface;
    for (key in this.modalsState) {
      // prettier-ignore
      modalArr.forEach((modelEl) => { 
        if(key === modelEl.modal){
          this.modalsState[key] = modelEl.state === undefined ? !this.modalsState[key] : modelEl.state;}
        } 
      );
    }
  }
  setModalTogglerState(modalArr: toggleModalInterface[]) {
    let key: keyof modalsInterface;
    for (key in this.modalsState) {
      // prettier-ignore
      modalArr.forEach((modelEl) => {
        if (key === modelEl.modal){
          this.modalsState[key] = modelEl.state === undefined ? !this.modalsState[key] : modelEl.state;
        }
      });
    }
  }
}

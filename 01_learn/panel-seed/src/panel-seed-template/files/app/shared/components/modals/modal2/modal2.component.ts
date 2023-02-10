import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: '[app-modal2]',
  templateUrl: './modal2.component.html',
  styleUrls: ['./modal2.component.scss'],
})
export class Modal2Component implements OnInit {
  @Input() modal2 = false;
  @Output('modal2Emmiter') modal2Emmiter = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onModal2Emmiter() {
    this.modal2Emmiter.emit();
  }
}

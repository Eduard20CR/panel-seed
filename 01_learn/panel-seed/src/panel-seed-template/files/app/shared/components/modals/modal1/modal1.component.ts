import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: '[app-modal1]',
  templateUrl: './modal1.component.html',
  styleUrls: ['./modal1.component.scss'],
})
export class Modal1Component implements OnInit {
  @Input() modal1 = false;
  @Output('modal1Emmiter') modal1Emmiter = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onModal1Emmiter() {
    this.modal1Emmiter.emit();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { SiblingsComunicationService } from 'src/app/shared/services/siblings-comunication.service';

@Component({
  selector: 'app-dynamic-pages',
  templateUrl: './dynamic-pages.component.html',
  styleUrls: ['./dynamic-pages.component.scss'],
})
export class DynamicPagesComponent implements OnInit, OnDestroy {
  imgLink = '';
  actualPath = '';
  isPopUpOpen = false;

  paramsSubscription!: Subscription;
  modalOpenSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private siblignComunication: SiblingsComunicationService,
    private modalService: ModalsService
  ) {}

  ngOnInit(): void {
    this.getRouteParamsOnUpdate();
    this.isModalOpen();
  }
  getRouteParamsOnUpdate() {
    this.paramsSubscription = this.route.params.subscribe(
      (params) => (this.imgLink = params['id'])
    );
  }

  isModalOpen() {
    this.modalOpenSubscription = this.modalService.isModalOpen.subscribe(
      ({ state }) => (this.isPopUpOpen = state)
    );
  }
  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
    this.modalOpenSubscription.unsubscribe();
  }
}

import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: '[app-preloader-images]',
  template: '',
  styles: [':host { position: absolute; top: 100%; left: 100%; }'],
})
export class PreloaderImagesComponent implements OnInit {
  imgs = new Array();
  imgBacgroudString!: String;

  constructor(private renderer2: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.pload([
      'assets/img/screensaverPic/ss1.jpg',
      'assets/img/screensaverPic/ss2.jpg',
    ]);
  }

  pload(args: any[]): void {
    this.imgs = args.map((imageUrl) => {
      const loadedImg = new Image();
      loadedImg.src = imageUrl;
      return loadedImg;
    });
    this.imgBacgroudString = args
      .map((imageUrl) => {
        const url = `url(${imageUrl})`;
        return url;
      })
      .join(',');
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'background-image',
      this.imgBacgroudString
    );
  }
}

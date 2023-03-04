import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: '[app-navigation]',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  isOpen = false;
  tabName!: string;
  tabNameCache!: string;

  menu = [
    {
      tabName: 'panels',
      title: 'Panels',
      childTabs: [
        { name: 'Angular', icon: 'angular' },
        { name: 'Electron', icon: 'electron' },
        { name: 'Ios', icon: 'ios' },
        { name: 'Components', icon: 'components' },
      ],
    },
    {
      tabName: 'websites',
      title: 'Websites',
      childTabs: [
        { name: 'Angular', icon: 'angular' },
        { name: 'Components', icon: 'components' },
      ],
    },
    {
      tabName: 'components',
      title: 'Components',
      childTabs: [
        { name: 'Panels', icon: 'panels' },
        { name: 'Websites', icon: 'websites' },
      ],
    },
    {
      tabName: 'utilities',
      title: 'Utilities',
      childTabs: [{ name: 'Find Pics', icon: 'find_pics' }],
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  @HostListener('mouseenter') mouseEnter() {
    this.tabName = this.tabNameCache;
    this.isOpen = true;
  }
  @HostListener('mouseleave') mouseLeave() {
    this.isOpen = false;
    this.tabNameCache = this.tabName;
    this.tabName = '';
  }

  onSelectTab(tabName: string) {
    if (this.tabName == tabName) this.tabName = '';
    else this.tabName = tabName;
  }
}

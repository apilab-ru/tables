import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MENU_ITEMS, MenuData } from './menu-items';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  readonly menuItems = MENU_ITEMS.filter(it => it.isShow);

  constructor(
    private activatedRoute: ActivatedRoute,
  ){}

  get title(): string {
    return this.menuData && this.menuData.title;
  }

  get menuData(): MenuData {
    return this.activatedRoute.snapshot.children[0]
      && this.activatedRoute.snapshot.children[0].routeConfig.data as MenuData;
  }

}

import { Route, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { RelateListComponent } from './relate-list/relate-list.component';

export interface MenuItem extends Route {
  isShow?: boolean;
  data?: MenuData;
}

export interface MenuData {
  title: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    path: 'users',
    component: UserListComponent,
    data: {
      title: 'Пользователи'
    },
    isShow: true
  },
  {
    path: 'relates',
    component: RelateListComponent,
    data: {
      title: 'Похожие материалы'
    },
    isShow: true
  },
  {
    path: '**',
    redirectTo: 'relates'
  }
];

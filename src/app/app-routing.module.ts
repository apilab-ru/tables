import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MENU_ITEMS } from './menu-items';

@NgModule({
  imports: [RouterModule.forRoot(MENU_ITEMS)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { RowComponent } from './row/row.component';
import { HeaderComponent } from './header/header.component';
import { GridCellComponent } from './cell/cell.component';
import { GridIteratorDirective } from './iterator.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    GridCellComponent,
    GridComponent,
    GridIteratorDirective,
    HeaderComponent,
    RowComponent,
  ],
  exports: [
    GridCellComponent,
    GridComponent,
    GridIteratorDirective,
    HeaderComponent,
    RowComponent,
  ]
})
export class GridModule {
}

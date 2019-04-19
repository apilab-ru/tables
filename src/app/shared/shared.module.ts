import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './filters/filters.component';
import { FiltersItemComponent } from './filters/item/item.component';
import { GridModule } from './grid/grid.module';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { MarkFoundDirective } from './directives/mark-found.directive';

@NgModule({
  declarations: [
    CheckboxComponent,
    FiltersComponent,
    FiltersItemComponent,
    MarkFoundDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    GridModule
  ],
  exports: [
    CheckboxComponent,
    FiltersComponent,
    FiltersItemComponent,
    FormsModule,
    GridModule,
    MarkFoundDirective
  ]
})
export class SharedModule {
}

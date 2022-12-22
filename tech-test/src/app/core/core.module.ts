import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreComponent } from './core.component';
import { LayoutModule } from './layout';

@NgModule({
  declarations: [CoreComponent],
  imports: [CommonModule, LayoutModule],
  exports: [CoreComponent],
})
export class CoreModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule, MatCheckboxModule, MatIconModule
  ],
  declarations: [],
  exports: [MatCheckboxModule, MatIconModule]
})
export class MaterialModule { }

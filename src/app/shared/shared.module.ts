import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [
    DateFormatPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterOutlet,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DateFormatPipe,
    RouterOutlet,
  ],
})
export class SharedModule { }
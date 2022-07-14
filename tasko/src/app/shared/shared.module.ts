import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule, 
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  exports:[ToolbarComponent]
})
export class SharedModule { }

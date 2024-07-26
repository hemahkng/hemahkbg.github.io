import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExcelMergeComponent } from './excel-merge/excel-merge.component';
import { ExcelMergeService } from './excel-merge.service';

@NgModule({
  declarations: [
    AppComponent,
    ExcelMergeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ExcelMergeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

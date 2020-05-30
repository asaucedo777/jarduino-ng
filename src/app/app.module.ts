import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { Esp8266Service } from './esp8266.service';
import { NgbTimeDateAdapter } from './date-picker.adapter';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    Esp8266Service,
    { provide: NgbTimeAdapter, useClass: NgbTimeDateAdapter },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

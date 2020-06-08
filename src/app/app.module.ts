import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { SliderModule } from 'primeng/slider';
import { InputNumberModule } from 'primeng/inputnumber';

import { AppComponent } from './app.component';
import { Esp8266Service } from './esp8266.service';
import { NgbNumberAdapter } from './number-picker.adapter';
import { ToastService } from './toast.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NoopAnimationsModule,
    HttpClientModule,
    NgbModule,
    SliderModule,
    InputNumberModule,
  ],
  providers: [
    Esp8266Service,
    { provide: NgbTimeAdapter, useClass: NgbNumberAdapter },
    ToastService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

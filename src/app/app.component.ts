import { Component, OnInit, OnDestroy } from '@angular/core';

import { Esp8266Service } from './esp8266.service';
import { Pin } from './pin.model';

const ONE_DAY = 24 * 60 * 60 * 1000;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title: 'Manual'|'Programado';
  switchTitle: string;
  scheduled: boolean;
  ledBuiltin: string;
  pines: Array<Pin>;
  pin: Pin;
  esp8266Time: number;
  now: number;
  alive: boolean;

  constructor(public esp8266Service: Esp8266Service) {
    this.switchTitle = 'Manual';
    this.pines = new Array<Pin>();
    this.pin = new Pin();
    // Quitamos ms y truncamos la fecha
    this.now = (Math.trunc((new Date()).getTime() / 1000) * 1000) % ONE_DAY;
    this.esp8266Time = 0;
  }
  ngOnInit(): void {
    this.alive = true;
    this.getTest();
    this.getScheduled();
    this.getLedBuiltinStatus();
    this.getPines();
    this.getTime();
  }
  ngOnDestroy(): void {
    this.alive = false;
  }

  public switchScheduled() {
    this.esp8266Service.scheduledSwitch()
      .subscribe(
        response => {
          this.scheduled = response.scheduledMode == 1;
          this.switchTitle = this.scheduled ? 'Programado' : 'Manual';
          this.getPines();
        },
        error => console.log(error)
      );
    this.getTime();
  }
  public switchLedBuiltin() {
    this.esp8266Service.ledBuiltinSwitch()
    .subscribe(
      response => this.ledBuiltin = response.ledBuiltin == '1' ? '0' : '1',
      error => console.log(error)
      );
    this.getTime();
  }
  public switch(pin: number) {
    this.esp8266Service.digitalPinSwitch(pin)
    .subscribe(
      response => this.getPines(),
      error => console.log(error)
      );
    this.getTime();
  }
  public pinUpdate(pin: number) {
    this.esp8266Service.digitalPinPost(this.bind(this.pines[pin]))
    .subscribe(
      response => this.getPines(),
      error => console.log(error)
      );
    this.getTime();
  }
  public getTime() {
    this.esp8266Service.getTime()
      .subscribe(
        response => this.esp8266Time = response.time * 1000,
        error => console.log(error)
      );
  }

  private getTest() {
    this.esp8266Service.test()
      .subscribe(
        response => this.title = response.test,
        error => console.log(error)
      );
  }
  private getScheduled() {
    this.esp8266Service.scheduledGet()
      .subscribe(
        response => {
          this.scheduled = response.scheduledMode == 1;
          this.switchTitle = this.scheduled ? 'Programado' : 'Manual';
        },
        error => console.log(error)
      );
  }
  private getLedBuiltinStatus() {
    this.esp8266Service.ledBuiltinStatus()
      .subscribe(
        response => this.ledBuiltin = response.ledBuiltin,
        error => console.log(error)
      );
  }
  private getPines() {
    this.esp8266Service.digitalPins()
      .subscribe(
        response => this.setearPines(response.pines),
        error => console.log(error)
      );
  }
  private setearPines(pines: Array<Pin>) {
    this.pines = [];
    if (pines) {
      pines.forEach((element: any) => {
        this.pines.push(new Pin(element))
      })
    }
    console.log(this.pines);
  }
  private bind(pin: Pin): string {
    let retorno = `pin=${pin.pin}&start0=${pin.start0 / 1000}&start1=${pin.start1 / 1000}&duration0=${pin.duration0}&duration1=${pin.duration1}`;
    console.log(retorno);
    return retorno;
  }

}

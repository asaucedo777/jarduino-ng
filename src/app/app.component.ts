import { Component, OnInit } from '@angular/core';
import { Esp8266Service } from './esp8266.service';
import { Pin } from './pin.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string;
  scheduled: boolean;
  ledBuiltin: string;
  pines: Array<Pin>;
  pin: Pin;
  esp8266Time: Date;
  constructor(public esp8266Service: Esp8266Service) {
    this.pines = new Array<Pin>();
    this.pin = new Pin();
  }
  ngOnInit(): void {
    this.getTest();
    this.getTime();
    this.getScheduled();
    this.getLedBuiltinStatus();
    this.getPines();
  }

  public switchScheduled() {
    this.esp8266Service.scheduledSwitch()
      .subscribe(
        response => {
          console.log(response);
          this.scheduled = response.scheduledMode == 1;
          this.getPines();
        },
        (error: any) => {
          console.log(error)
        });
  }
  public switchLedBuiltin() {
    this.esp8266Service.ledBuiltinSwitch()
      .subscribe(
        response => {
          console.log(response);
          this.ledBuiltin = response.ledBuiltin == '1' ? '0' : '1';
        },
        (error: any) => {
          console.log(error)
        });
  }
  public switch(pin: number) {
    this.esp8266Service.digitalPinSwitch(pin)
      .subscribe(
        response => {
          console.log(response);
          this.getPines();
        },
        (error: any) => {
          console.log(error)
        });
  }
  public pinUpdate(pin: number) {
    this.esp8266Service.digitalPinPost(this.pines[pin])
      .subscribe(
        response => {
          console.log(response);
          this.getPines();
        },
        (error: any) => {
          console.log(error)
        });
  }


  private getTest() {
    this.esp8266Service.test()
      .subscribe(
        response => {
          console.log(response);
          this.title = response.test;
        },
        (error: any) => {
          console.log(error)
        });
  }
  private getTime() {
    this.esp8266Service.getTime()
      .subscribe(
        response => {
          console.log(response);
          this.esp8266Time = new Date(response.time * 1000);
        },
        (error: any) => {
          console.log(error)
        });
  }
  private getScheduled() {
    this.esp8266Service.scheduledGet()
      .subscribe(
        response => {
          console.log(response);
          this.scheduled = response.scheduledMode == 1;
        },
        (error: any) => {
          console.log(error)
        });
  }
  private getLedBuiltinStatus() {
    this.esp8266Service.ledBuiltinStatus()
      .subscribe(
        response => {
          console.log(response);
          this.ledBuiltin = response.ledBuiltin;
        },
        (error: any) => {
          console.log(error)
        });
  }
  private getPines() {
    this.esp8266Service.digitalPins()
      .subscribe(
        response => {
          console.log(response);
          this.setearPines(response.pines);
        },
        (error: any) => {
          console.log(error)
        });
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
}

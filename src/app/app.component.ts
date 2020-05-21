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
  scheduled: string;
  pines: Array<Pin>;
  constructor(public esp8266Service: Esp8266Service) {
  }
  ngOnInit(): void {
    this.getTest();
    this.getScheduled()
    this.getPins()

  }
  public activar(pin: number) {
    this.esp8266Service.digitalPinOn(pin)
      .subscribe(
        response => {
          console.log(response);
          this.getPins();
        },
        (error: any) => {
          console.log(error)
        });
  }
  public desactivar(pin: number) {
    this.esp8266Service.digitalPinOff(pin)
      .subscribe(
        response => {
          console.log(response);
          this.getPins();
        },
        (error: any) => {
          console.log(error)
        });
  }
  public switchScheduled() {
    this.esp8266Service.digitalPinScheduledSwitch('1')
      .subscribe(
        response => {
          console.log(response);
          this.scheduled = this.scheduled == '1' ? '0' : '1';
          this.getPins();
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
          this.title = response.mensaje;
        },
        (error: any) => {
          console.log(error)
        });
  }
  private getScheduled() {
    this.esp8266Service.digitalPinScheduled()
      .subscribe(
        response => {
          console.log(response);
          this.scheduled = response.scheduled;
        },
        (error: any) => {
          console.log(error)
        });
  }
  private getPins() {
    this.esp8266Service.digitalPinSchedules()
      .subscribe(
        response => {
          console.log(response);
          this.pines = response.pines;
        },
        (error: any) => {
          console.log(error)
        });
  }
}

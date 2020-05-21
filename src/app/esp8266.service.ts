import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pin } from './pin.model';

@Injectable()
export class Esp8266Service {

  constructor(public httpClient: HttpClient) { }

  public test(): Observable<any> {
    return this.httpClient.get('http://192.168.0.23/test');
  }
  public ledBuiltinSwitch(): Observable<any> {
    return this.httpClient.get('http://192.168.0.23/LED_BUILTIN/SWITCH');
  }
  public ledBuiltinOn(): Observable<any> {
    return this.httpClient.get('http://192.168.0.23/LED_BUILTIN/ON');
  }
  public ledBuiltinOff(): Observable<any> {
    return this.httpClient.get('http://192.168.0.23/LED_BUILTIN/OFF');
  }
  public time(): Observable<any> {
    return this.httpClient.get('http://192.168.0.23/TIME');
  }
  public digitalPinSwitch(pin): Observable<any> {
    return this.httpClient.get('http://192.168.0.23/DIGITAL_PIN/SWITCH?pin=' + pin);
  }
  public digitalPinOn(pin): Observable<any> {
    return this.httpClient.get('http://192.168.0.23/DIGITAL_PIN/ON?pin=' + pin);
  }
  public digitalPinOff(pin): Observable<any> {
    return this.httpClient.get('http://192.168.0.23/DIGITAL_PIN/OFF?pin=' + pin);
  }
  public digitalPinSchedule(): Observable<any> {
    return this.httpClient.get('http://192.168.0.23/DIGITAL_PIN/SCHEDULE');
  }
  public digitalPinSchedules(): Observable<any> {
    return this.httpClient.get('http://192.168.0.23/DIGITAL_PIN/SCHEDULES');
  }
  public digitalPinScheduleSwitch(pinData: Pin): Observable<any> {
    return this.httpClient.post('http://192.168.0.23/DIGITAL_PIN/SCHEDULE', pinData);
  }
  public digitalPinScheduled(): Observable<any> {
    return this.httpClient.get('http://192.168.0.23/DIGITAL_PIN/SCHEDULED');
  }
  public digitalPinScheduledSwitch(scheduled: any): Observable<any> {
    return this.httpClient.post('http://192.168.0.23/DIGITAL_PIN/SCHEDULED', scheduled);
  }
}

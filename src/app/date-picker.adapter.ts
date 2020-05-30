import { Injectable } from '@angular/core';
import { NgbTimeStruct, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class NgbTimeDateAdapter extends NgbTimeAdapter<Date> {

  fromModel(value: Date | null): NgbTimeStruct | null {
    if (!value) {
      return null;
    }
    var ngbTimeStruct = { 
      hour: value.getHours(), 
      minute: value.getMinutes(), 
      second: value.getSeconds() 
    };
    return ngbTimeStruct;
  }

  toModel(time: NgbTimeStruct | null): Date | null {
    return time ? new Date(1970, 0, 0, 
      time.hour, time.minute, time.second, 0) : null;
  }
}

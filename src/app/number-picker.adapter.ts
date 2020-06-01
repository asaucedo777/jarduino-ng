import { Injectable } from '@angular/core';
import { NgbTimeStruct, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class NgbNumberAdapter extends NgbTimeAdapter<number> {

  fromModel(numero: number | null): NgbTimeStruct | null {
    if (!numero) {
      return null;
    }
    var value = new Date(numero);
    var ngbTimeStruct = {
      hour: value.getHours() - 1,
      minute: value.getMinutes(),
      second: value.getSeconds()
    };
    return ngbTimeStruct;
  }

  toModel(time: NgbTimeStruct | null): number | null {
    if (time) {
      let value = new Date(1970, 0, 0,
        time.hour, time.minute, time.second, 0);
      return value.getTime() + 90000000;
    } else {
      return null;
    }
  }
}

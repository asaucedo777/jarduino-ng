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
      let value = new Date(time.hour * 60 * 60000 + time.minute * 60000 + time.second * 1000);
      return value.getTime();
    } else {
      return null;
    }
  }
}

export interface IPin {
  pin: number;
  status: number;
  start0: Date;
  end0: Date;
}
export class Pin implements IPin {
  pin: number;
  status: number;
  start0: Date;
  end0: Date;
  constructor(data: IPin = null) {
    if (data) {
      return Object.assign(this, data);
    } else {
      this.pin = -1;
      this.status = -1;
      this.start0 = null;
      this.end0 = null;
    }
  }
}

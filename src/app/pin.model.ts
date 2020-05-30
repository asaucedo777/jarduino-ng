export interface IPin {
  pin: number;
  description: string;
  status: number;
  start0: Date;
  end0: Date;
  result?: string;
}

export class Pin implements IPin {
  pin: number;
  description: string;
  status: number;
  start0: Date;
  end0: Date;
  result: string;
  constructor(data: IPin = null) {
    let retorno = null;
    if (data) {
      retorno = Object.assign(this, data);
      retorno.start0 = new Date(retorno.start0 * 1000);
      retorno.end0 = new Date(retorno.end0 * 1000);
    } else {
      retorno = Object.assign(this, {
        pin: -1,
        description: "",
        status: -1,
        start0: new Date(0),
        end0: new Date(0),
        result: null
      });
    }
    return retorno;
  }
  // TODO bindModel Dates
}

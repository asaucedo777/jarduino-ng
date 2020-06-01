export interface IPin {
  pin: number;
  description: string;
  status: number;
  start0: number;
  end0: number;
  result?: string;
}

export class Pin implements IPin {
  pin: number;
  description: string;
  status: number;
  start0: number;
  end0: number;
  result: string;
  constructor(data: IPin = null) {
    let retorno = null;
    if (data) {
      retorno = Object.assign(this, data);
      retorno.start0 = (retorno.start0 * 1000);
      retorno.end0 = (retorno.end0 * 1000);
    } else {
      retorno = Object.assign(this, {
        pin: -1,
        description: "",
        status: -1,
        start0: (0),
        end0: (0),
        result: null
      });
    }
    return retorno;
  }
}

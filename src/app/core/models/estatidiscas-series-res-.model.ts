

  export class EstadisticasResObject {
    constructor (
      public labels: string[],
      public series: Serie[]

    ) {}
  }


  export class Serie {
    constructor (
      public label: string,
      public data: number[],
      public backgroundColor: string,
      public borderColor: string,
      public borderWidth: number

    ) {}
  }

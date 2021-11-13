
export class EstadisticasReqObject {
  constructor (
      public fechaDesde: string,
      public fechaHasta: string,
      public productorID: string,
      public unidadMedidaID: string
    ) {}
  }


export class EstadisticasEstadoGeneralPieReqObject {
  constructor (
      public productorID: string
    ) {}
  }

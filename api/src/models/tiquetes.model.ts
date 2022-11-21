import {Entity, model, property} from '@loopback/repository';

@model()
export class Tiquetes extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  usuarioId?: string;

  @property({
    type: 'string',
  })
  vuelosId?: string;

  constructor(data?: Partial<Tiquetes>) {
    super(data);
  }
}

export interface TiquetesRelations {
  // describe navigational properties here
}

export type TiquetesWithRelations = Tiquetes & TiquetesRelations;

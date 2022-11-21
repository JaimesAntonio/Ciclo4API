import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Tiquetes, TiquetesRelations} from '../models';

export class TiquetesRepository extends DefaultCrudRepository<
  Tiquetes,
  typeof Tiquetes.prototype.id,
  TiquetesRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Tiquetes, dataSource);
  }
}

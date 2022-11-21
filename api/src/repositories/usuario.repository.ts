import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Vuelos, Tiquetes} from '../models';
import {TiquetesRepository} from './tiquetes.repository';
import {VuelosRepository} from './vuelos.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly vuelos: HasManyThroughRepositoryFactory<Vuelos, typeof Vuelos.prototype.id,
          Tiquetes,
          typeof Usuario.prototype.id
        >;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('TiquetesRepository') protected tiquetesRepositoryGetter: Getter<TiquetesRepository>, @repository.getter('VuelosRepository') protected vuelosRepositoryGetter: Getter<VuelosRepository>,
  ) {
    super(Usuario, dataSource);
    this.vuelos = this.createHasManyThroughRepositoryFactoryFor('vuelos', vuelosRepositoryGetter, tiquetesRepositoryGetter,);
    this.registerInclusionResolver('vuelos', this.vuelos.inclusionResolver);
  }
}

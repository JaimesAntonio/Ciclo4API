
import {service} from '@loopback/core';
import {AuthService} from '../services';
import axios from 'axios';
import {configuracion} from '../config/config';
import {Credenciales} from '../models';
import { HttpErrors} from '@loopback/rest';
import {authenticate} from '@loopback/authentication';
import {Aeropuerto} from '../models';
import {AeropuertoRepository} from '../repositories';





import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';


export class AeropuertoController {
  constructor(
    @repository(AeropuertoRepository)
    public aeropuertoRepository : AeropuertoRepository,
  ) {}

  @authenticate.skip()
  @post('/Aeropuertos')
  @response(200, {
    description: 'Aeropuerto model instance',
    content: {'application/json': {schema: getModelSchemaRef(Aeropuerto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aeropuerto, {
            title: 'NewAeropuerto',
            exclude: ['id'],
          }),
        },
      },
    })
    aeropuerto: Omit<Aeropuerto, 'id'>,
  ): Promise<Aeropuerto> {
    return this.aeropuertoRepository.create(aeropuerto);
  }

  @get('/Aeropuertos/count')
  @response(200, {
    description: 'Aeropuerto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Aeropuerto) where?: Where<Aeropuerto>,
  ): Promise<Count> {
    return this.aeropuertoRepository.count(where);
  }

  @get('/Aeropuertos')
  @response(200, {
    description: 'Array of Aeropuerto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Aeropuerto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Aeropuerto) filter?: Filter<Aeropuerto>,
  ): Promise<Aeropuerto[]> {
    return this.aeropuertoRepository.find(filter);
  }

  @patch('/Aeropuertos')
  @response(200, {
    description: 'Aeropuerto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aeropuerto, {partial: true}),
        },
      },
    })
    aeropuerto: Aeropuerto,
    @param.where(Aeropuerto) where?: Where<Aeropuerto>,
  ): Promise<Count> {
    return this.aeropuertoRepository.updateAll(aeropuerto, where);
  }

  @get('/Aeropuertos/{id}')
  @response(200, {
    description: 'Aeropuerto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Aeropuerto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Aeropuerto, {exclude: 'where'}) filter?: FilterExcludingWhere<Aeropuerto>
  ): Promise<Aeropuerto> {
    return this.aeropuertoRepository.findById(id, filter);
  }

  @patch('/Aeropuertos/{id}')
  @response(204, {
    description: 'Aeropuerto PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aeropuerto, {partial: true}),
        },
      },
    })
    aeropuerto: Aeropuerto,
  ): Promise<void> {
    await this.aeropuertoRepository.updateById(id, aeropuerto);
  }

  @put('/Aeropuertos/{id}')
  @response(204, {
    description: 'Aeropuerto PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() aeropuerto: Aeropuerto,
  ): Promise<void> {
    await this.aeropuertoRepository.replaceById(id, aeropuerto);
  }

  @del('/Aeropuertos/{id}')
  @response(204, {
    description: 'Aeropuerto DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.aeropuertoRepository.deleteById(id);
  }
}

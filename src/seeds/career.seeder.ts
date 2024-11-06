import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Career } from '../lib/career/infrastructure/entity/career.entity';

@Injectable()
export class CareerSeeder implements OnModuleInit {
  constructor(
    @InjectRepository(Career)
    private readonly careerRepository: Repository<Career>,
  ) {}

  async onModuleInit() {
    const careers = [
      { name: 'Licenciatura en Bilingüismo' },
      { name: 'Contaduría Pública' },
      { name: 'Administración de Empresas' },
      { name: 'Derecho' },
      { name: 'Ingeniería Industrial' },
      { name: 'Ingeniería de Sistemas' },
      { name: 'Administración de Empresas Turísticas y Hoteleras' },
      {
        name: 'Tecnología en Desarrollo de Sistemas de Información y de Software',
      },
      { name: 'Tecnología en Sistemas de Gestión de Calidad' },
      { name: 'Tecnología en Gestión de Servicios Turísticos y Hoteleros' },
    ];

    const existingCareers = await this.careerRepository.find();

    if (existingCareers.length === 0) {
      await this.careerRepository.save(careers);
      console.log('Carreras predefinidas ingresadas');
    } else {
      console.log('Las carreras ya se ingresaron ._.');
    }
  }
}

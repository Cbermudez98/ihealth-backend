import { IAppointmentService } from '../../domain/services/IAppointment.service';

export class GetAllAppointmentsUSeCase {
  constructor(private readonly appointmentsService: IAppointmentService) {}
  async run() {
    return this.appointmentsService.getAll();
  }
}

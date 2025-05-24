import { IUser } from '../../../../lib/user/domain/interfaces/IUser';
import { IAppointmentService } from '../../domain/services/IAppointment.service';

export class GetHistoryAppointmentUseCase {
  constructor(private readonly appointmentService: IAppointmentService) {}
  async run(id: IUser['id']) {
    return await this.appointmentService.getHistory(id);
  }
}

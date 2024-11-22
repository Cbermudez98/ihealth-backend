import { IUser } from 'src/lib/user/domain/interfaces/IUser';
import { IAppointmentService } from '../../domain/services/IAppointment.service';

export class CurrentAppointmentUseCase {
  constructor(private readonly appointmentService: IAppointmentService) {}
  async run(user_id: IUser['id']) {
    try {
      const appointment = await this.appointmentService.getByUserId(user_id);

      return appointment;
    } catch (error) {
      console.log('🚀  ~ CurrentAppointmentUseCase ~ run ~ error:', error);
    }
  }
}

import { NotFoundError } from '../../../common/domain/errors/NotFoundErrors';
import { IAppointment } from '../../domain/interfaces/IAppointment';
import { IStatus } from '../../domain/interfaces/IStatus';
import { IAppointmentService } from '../../domain/services/IAppointment.service';
import { IStatusService } from '../../domain/services/IStatus.service';

export class UpdateStatusAppointmentUseCase {
  constructor(
    private readonly appointmentService: IAppointmentService,
    private readonly statusService: IStatusService,
  ) {}
  async run(id: IAppointment['id'], status_id: IStatus['id']) {
    const status = await this.statusService.get(status_id);
    if (!status) {
      throw new NotFoundError('Status not found');
    }

    const appointment = await this.appointmentService.get(id);
    if (!appointment) {
      throw new NotFoundError('Status not found');
    }
    await this.appointmentService.changeStatus(appointment, status);
    return { msg: 'Update status' };
  }
}

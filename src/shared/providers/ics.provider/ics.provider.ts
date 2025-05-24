import { Injectable } from '@nestjs/common';
import ical from 'ical-generator';
import {
  IICs,
  IICsService,
} from '../../../lib/common/domain/services/IICs.service';

@Injectable()
export class IcsProvider implements IICsService {
  generate(ics: IICs): string {
    const calendar = ical({
      name: 'Event Calendar',
      timezone: 'UTC',
    });

    calendar.createEvent({
      start: ics.startDate,
      end: ics.endDate,
      summary: ics.summary,
      description: ics.description,
      location: ics.location,
      url: ics.url,
      organizer: {
        name: 'IHealth',
        email: process.env.MAIL_NOTIFIER,
        mailto: ics.mailTo,
        sentBy: process.env.MAIL_NOTIFIER,
      },
    });

    return calendar.toString();
  }
}

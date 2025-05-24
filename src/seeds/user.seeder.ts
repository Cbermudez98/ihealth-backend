import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../lib/schedule/infrastructure/entity/Schedule.entity'; // Asegúrate de importar la entidad correctamente
import { IScheduleCreate } from '../lib/schedule/domain/interfaces/ISchedule';
import { DAYS } from '../common/constants/keys';

@Injectable()
export class ScheduleSeeder implements OnModuleInit {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async onModuleInit() {
    const existingSchedules = await this.scheduleRepository.find();

    if (existingSchedules.length === 0) {
      await this.generateSchedulesForWeek();
    }
  }

  async generateSchedulesForWeek() {
    const schedules: Schedule[] = [];

    const daysOfWeek: DAYS[] = [
      DAYS.MONDAY,
      DAYS.TUESDAY,
      DAYS.WEDNESDAY,
      DAYS.THURSDAY,
      DAYS.FRIDAY,
      DAYS.SATURDAY,
    ];

    for (const day of daysOfWeek) {
      for (let startTime = 8; startTime < 12; startTime += 0.75) {
        const startTimeString = this.formatTime(startTime);
        const endTimeString = this.formatTime(startTime + 0.75); // 45 minutes duration

        schedules.push(
          this.createSchedule(day, startTimeString, endTimeString),
        );
      }

      if (day !== DAYS.SATURDAY) {
        for (let startTime = 14; startTime < 18; startTime += 0.75) {
          const startTimeString = this.formatTime(startTime);
          const endTimeString = this.formatTime(startTime + 0.75); // 45 minutes duration

          schedules.push(
            this.createSchedule(day, startTimeString, endTimeString),
          );
        }
      }

      if (day === DAYS.SATURDAY) {
        for (let startTime = 8; startTime < 12; startTime += 0.75) {
          const startTimeString = this.formatTime(startTime);
          const endTimeString = this.formatTime(startTime + 0.75); // 45 minutes duration

          schedules.push(
            this.createSchedule(day, startTimeString, endTimeString),
          );
        }
      }
    }

    await this.scheduleRepository.save(schedules);
  }

  formatTime(hour: number): string {
    const hours = Math.floor(hour);
    const minutes = Math.round((hour - hours) * 60);
    const formattedHour = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHour}:${formattedMinutes}:00`; // Return time as HH:mm:ss
  }

  createSchedule(day: string, start_time: string, end_time: string): Schedule {
    const schedule = new Schedule();
    schedule.day = day;
    schedule.start_time = start_time;
    schedule.end_time = end_time;
    return schedule;
  }
}

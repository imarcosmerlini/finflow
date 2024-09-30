import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { PrismaService } from '../prisma.service';
import { INotification } from './inotification';
import { ErrorsService } from '../errors/errors.service';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private errorService: ErrorsService,
  ) {}

  async sendNotifications(transaction: INotification) {
    try {
      const apiNotification =
        this.configService.get<string>('API_NOTIFICATION');
      const response = await axios.get(apiNotification);
      await this.saveNotification(transaction);
      return response.data;
    } catch (e) {
      await this.errorService.badRequest(e.message);
    }
  }

  async saveNotification(
    notification: INotification,
  ): Promise<INotification | any> {
    return this.prisma.notification.create({ data: notification });
  }
}

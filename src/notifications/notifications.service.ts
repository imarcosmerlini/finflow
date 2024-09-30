import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { PrismaService } from '../prisma.service';
import { INotification } from './inotification';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async sendNotifications(transaction: INotification) {
    const apiNotification = this.configService.get<string>('API_NOTIFICATION');
    const response = await axios.get(apiNotification);

    await this.saveNotification(transaction);

    return response.data;
  }

  async saveNotification(
    notification: INotification,
  ): Promise<INotification | any> {
    return this.prisma.notification.create({ data: notification });
  }
}

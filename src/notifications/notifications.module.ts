import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { PrismaService } from '../prisma.service';
import { ErrorsService } from '../errors/errors.service';

@Module({
  providers: [NotificationsService, PrismaService, ErrorsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}

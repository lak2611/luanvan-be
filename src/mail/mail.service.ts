import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendNewAccountMail(to: string, username: string, password: string) {
    await this.mailerService.sendMail({
      to,
      subject:
        'Hệ thống quản lý xét cấp học bổng - Quỹ học bổng Thắp Sáng Niềm Tin',
      template: './newAccount',
      context: {
        username: username,
        password: password,
        url: 'http://localhost:3000',
      },
    });
  }

  async sendNewApplicationMail(to: string, applicationId: number) {
    await this.mailerService.sendMail({
      to,
      subject:
        'Hệ thống quản lý xét cấp học bổng - Quỹ học bổng Thắp Sáng Niềm Tin',
      template: './newApplication',
      context: {
        url: 'http://localhost:3000/public/apply/' + applicationId,
      },
    });
  }

  async sendPassedNoti(to: string, year: number) {
    await this.mailerService.sendMail({
      to,
      subject:
        'Hệ thống quản lý xét cấp học bổng - Quỹ học bổng Thắp Sáng Niềm Tin',
      template: './passedNoti',
      context: {
        url: 'http://localhost:3000/public/round/' + year,
      },
    });
  }

  async sendFailedNoti(to: string, year: number) {
    await this.mailerService.sendMail({
      to,
      subject:
        'Hệ thống quản lý xét cấp học bổng - Quỹ học bổng Thắp Sáng Niềm Tin',
      template: './rejectedNoti',
      context: {
        year: year,
      },
    });
  }
}

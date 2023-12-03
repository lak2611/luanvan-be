import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { NonstudentModule } from 'src/nonstudent/nonstudent.module';
import { MailModule } from 'src/mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nonstudent } from 'src/entities/Nonstudent';

@Module({
  imports: [TypeOrmModule.forFeature([Nonstudent])],

  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationModule } from './application/application.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Round } from './entities/Round';
import { Application } from './entities/Application';
import { RoundModule } from './round/round.module';
import { DataSource } from 'typeorm';
import { DocTypeModule } from './doc-type/doc-type.module';
import { DocType } from './entities/DocType';
import { File } from './entities/File';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from './constant';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { Nonstudent } from './entities/Nonstudent';
import { NonstudentModule } from './nonstudent/nonstudent.module';
import { MailModule } from './mail/mail.module';
import { SponsorModule } from './sponsor/sponsor.module';
import { Sponsor } from './entities/Sponsor';
import { Comment } from './entities/Comment';
import { CommentModule } from './comment/comment.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: __dirname + '/../userAssets',
    }),
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    ApplicationModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'LuanVan',
      entities: [
        Round,
        Application,
        DocType,
        File,
        Nonstudent,
        Sponsor,
        Comment,
      ],
      // synchronize: true,
    }),
    RoundModule,
    DocTypeModule,
    AuthModule,
    NonstudentModule,
    MailModule,
    SponsorModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

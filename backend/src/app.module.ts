import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.model';
import { Groups } from './models/groups.model';
import { Message } from './models/message.model';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/userServices/user.service';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthServices } from './services/authServices/auth.service';
import { MessageController } from './controllers/message/message.controller';
import { MessageService } from './services/messageServices/message.service';
import { GroupsController } from './controllers/groups/groups.controller';
import { GroupsService } from './services/groupsServices/groups.service';
import { VerifyAuthMiddleware } from './middlewares/verifyAuth/verifyAuth.middleware';
import { WebsocketService } from './websocket/websocket.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION as any,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [User, Groups, Message],
    }),
    TypeOrmModule.forFeature([User, Groups, Message]),
  ],
  controllers: [
    AppController,
    UserController,
    AuthController,
    MessageController,
    GroupsController,
  ],
  providers: [
    AppService,
    UserService,
    AuthServices,
    MessageService,
    GroupsService,
    WebsocketService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyAuthMiddleware)
      .exclude({ path: 'users', method: RequestMethod.POST })
      .forRoutes('users', 'groups', 'messages');
  }
}

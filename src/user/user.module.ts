import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [HttpModule, ConfigModule, RabbitMQModule.forRoot(RabbitMQModule, {
    exchanges: [
      {
        name: 'users',
        type: 'fanout'
      }
    ],
    uri: 'amqp://guest:guest@localhost:5672',
  })],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }

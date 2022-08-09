import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(private readonly httpService: HttpService, private readonly amqpConnection: AmqpConnection /* @Inject('USERS_SERVICE') private client: ClientProxy */) { }

    async getAllUsers() {
        // Get users from endpoint
        let response = await this.httpService.axiosRef.get('https://jsonplaceholder.typicode.com/users');
        let users = response.data;

        // Delete property address from lis of users
        users.forEach(user => delete user.address);

        // Sort the list of user in descending order
        users.sort((userA, userB) => userB.id - userA.id);

        // Public on RabbitMQ user that your id is an even number on exchange "users" of fanout type that have to be binded with queue "users-requested"
        let userToSend = users.filter(user => user.id % 2 === 0);

        for (const user of userToSend) {
            await this.amqpConnection.publish('users', '', user);
        }
        return users;
    }
}

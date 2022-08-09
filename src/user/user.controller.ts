import { UserService } from './user.service';
import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UserController {
    constructor (private userService: UserService) {}

    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }
}

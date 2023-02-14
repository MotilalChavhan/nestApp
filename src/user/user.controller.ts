import { Controller, Get } from '@nestjs/common';
import { timeStamp } from 'console';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    getAllUsers() {
        return this.userService.findAll();
    }
}

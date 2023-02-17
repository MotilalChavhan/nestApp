import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { Roles } from './decorator';
import { UserDto } from './dto';
import { Role } from './enums';
import { RolesGuard } from './guard';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@UseGuards(RolesGuard)
@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Get()
	getAllUsers() {
		return this.userService.findAll();
	}

	@Get(':id')
	getOneUser(@Param('id') id: string) {
		return this.userService.findOne(id);
	}

	@Roles(Role.Admin)
	@Put(':id')
	updateUser(@Param('id') id: string, @Body() userDto: UserDto) {
		return this.userService.update(id, userDto);
	}

	@Roles(Role.Admin)
	@Delete(':id')
	destroyUser(@Param('id') id: string) {
		return this.userService.remove(id);
	}
}

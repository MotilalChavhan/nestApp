import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User)
		private userModel: typeof User,
	) {}

	async signup(dto: AuthDto) {
		const hash = await argon.hash(dto.password);

		const user = await this.userModel.create({
			email: dto.email,
			hash
		})

		return user;
		return { msg: 'I have signed up' };
	}

	signin() {
		return { msg: 'I have signed in' };
	}
}

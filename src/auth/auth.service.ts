import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { ValidationError } from 'sequelize';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User)
		private userModel: typeof User,
		private jwt: JwtService,
		private config: ConfigService,
	) {}

	async signup(dto: AuthDto) {
		// generating hash of the password
		const hash = await argon.hash(dto.password);
		
		// adding user to the database
		try {
			const user = await this.userModel.create({
				email: dto.email,
				hash
			})
	
			return this.signToken(user.id, user.email);
		} catch (error) {
			if (error instanceof ValidationError) {
				throw new ForbiddenException("Credentials already taken");
			}
			throw error;
		}
	}

	async signin(dto: AuthDto) {
		// get the user from the db
		const user = await this.userModel.findOne({
			where: {
				email: dto.email
			}
		});

		// checking if user exists
		if (!user) {
			throw new ForbiddenException("Credentials invalid");
		}
		
		console.log(user.email)
		// checking password
		const passwordMatch = await argon.verify(user.hash, dto.password);

		if (!passwordMatch) {
			throw new ForbiddenException("Incorrect password");
		}

		return this.signToken(user.id, user.email);
	}

	async signToken(userId: number, email: string): Promise<{access_token: string}> {
		const payload = {
			sub: userId,
			email
		};

		const token = await this.jwt.signAsync(payload, {
			expiresIn: '15m',
			secret: this.config.get('JWT_SECRET')
		});

		return {
			access_token: token,
		};
	}
}

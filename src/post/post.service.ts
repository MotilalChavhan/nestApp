import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ValidationError } from 'sequelize';
import { PostDto } from './dto';
import { Post } from './post.model';

@Injectable()
export class PostService {
	constructor(
		@InjectModel(Post)
		private postModel: typeof Post,
	) {}

	async create(postDto: PostDto, userId: number) {
		try {
			const post = await this.postModel.create({
				body: postDto.body,
				userId
			});

			return post;
		} catch (error) {
			if (error instanceof ValidationError){
				throw new NotFoundException("body field should be provided to create post");
			}
			throw error;
		}
	}
}

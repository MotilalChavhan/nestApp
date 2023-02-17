import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { PostDto } from './dto';
import { PostService } from './post.service';

@UseGuards(JwtGuard)
@Controller('post')
export class PostController {
	constructor(private postService: PostService) {}

	@Post()
	createPosts(@Body() postDto: PostDto, @Req() req: Request) {
		return this.postService.create(postDto, req.user['sub']);
	}
}

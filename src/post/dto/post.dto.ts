import { IsNotEmpty, IsString } from "class-validator";

export class PostDto {
    @IsString()
    @IsNotEmpty()
    body: string;
}
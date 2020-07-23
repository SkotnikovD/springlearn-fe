import { GetUserDto as GetUserDto } from './user';

export interface PostWithAuthor {
    postId: number;
    text: string;
    createdDate: Date;
    author: GetUserDto;
  }
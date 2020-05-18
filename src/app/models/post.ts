import { User } from './user';

export interface PostWithAuthor {
    postId: number;
    text: string;
    createdDate: Date;
    author: {
      userId: number;
      roles: string[];
      name: string;
      birthdayDate: Date;
      avatarThumbnailUrl: string;
      avatarFullsizeUrl: string;
    }
  }
import { User } from './user';

export interface Post {
    postId: number;
    text: string;
    createdDate: Date;
    author: {
      userId: number;
      login: string;
      roles: string[];
      firstName: string;
      birthdayDate: Date;
      avatarThumbnailUrl: string;
      avatarFullsizeUrl: string;
    }
  }
import { User } from './user';

export interface Post {
    id: number;
    text: string;
    createdDate: Date;
    author: {
      userId: number;
      login: string;
      password: string;
      roles: string[];
      firstName: string;
      birthdayDate: Date;
      avatarThumbnailUrl: string;
      avatarFullsizeUrl: string;
    }
  }
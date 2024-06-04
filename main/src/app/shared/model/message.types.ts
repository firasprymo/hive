import {Users} from './user.types';

export interface Message {
  id?: number;
  text: string;
  createdAt: string;
  user: boolean;
}

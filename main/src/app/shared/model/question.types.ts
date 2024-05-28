import {Users} from './user.types';
import {Reponse} from './reponse.types';

export interface Question {
  id?: number;
  title?: string;
  content?: string;
  priority?: string;
  createdAt?: Date;
  upVotes?: number;
  downVotes?: number;
  user?: Users;
  reponses?: Reponse[];
}

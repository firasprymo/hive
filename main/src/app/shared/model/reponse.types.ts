import {Question} from './question.types';
import {Users} from './user.types';

export interface Reponse {
  id?: number;
  title?: string;
  content?: string;
  createdAt?: Date;
  question?: Question;
  user?: Users;

}

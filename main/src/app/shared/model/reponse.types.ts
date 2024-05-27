import {Question} from './question.types';

export interface Reponse {
  id?: number;
  title?: string;
  content?: string;
  createdAt?: Date;
  upVotes?: number;
  downVotes?: number;
  question?: Question;
}

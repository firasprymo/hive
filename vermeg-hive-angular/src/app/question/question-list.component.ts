import { Component, OnInit } from '@angular/core';
import { Question } from './question.model';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  questions: Question[];

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.getAllQuestions().subscribe(
      (questions: Question[]) => {
        this.questions = questions;
      },
      (error) => {
        console.error('Error loading questions:', error);
      }
    );
  }

  upvoteQuestion(questionId: number): void {
    this.questionService.upvoteQuestion(questionId).subscribe(
      (updatedQuestion: Question) => {
        const index = this.questions.findIndex(q => q.id === questionId);
        if (index !== -1) {
          this.questions[index] = updatedQuestion;
        }
      },
      (error: any) => {
        console.error('Error upvoting question:', error);
      }
    );
  }

  downvoteQuestion(questionId: number): void {
    this.questionService.downvoteQuestion(questionId).subscribe(
      (updatedQuestion: Question) => {
        const index = this.questions.findIndex(q => q.id === questionId);
        if (index !== -1) {
          this.questions[index] = updatedQuestion;
        }
      },
      (error: any) => {
        console.error('Error downvoting question:', error);
      }
    );
  }
}

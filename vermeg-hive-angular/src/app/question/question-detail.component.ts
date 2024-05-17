import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from './question.model';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent implements OnInit {
  question: Question;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const questionId = +params.get('id');
      this.loadQuestion(questionId);
    });
  }

  loadQuestion(questionId: number): void {
    this.questionService.getQuestionById(questionId).subscribe(
      (question: Question) => {
        this.question = question;
      },
      (error) => {
        console.error('Error loading question:', error);
      }
    );
  }

  upvoteQuestion(): void {
    this.questionService.upvoteQuestion(this.question.id).subscribe(
      (updatedQuestion: Question) => {
        this.question = updatedQuestion;
      },
      (error) => {
        console.error('Error upvoting question:', error);
      }
    );
  }

  downvoteQuestion(): void {
    this.questionService.downvoteQuestion(this.question.id).subscribe(
      (updatedQuestion: Question) => {
        this.question = updatedQuestion;
      },
      (error) => {
        console.error('Error downvoting question:', error);
      }
    );
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from './question.model';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent {
  question: Question = { title: '', content: '' };

  constructor(private questionService: QuestionService, private router: Router) { }

  createQuestion(): void {
    this.questionService.createQuestion(this.question).subscribe(
      (createdQuestion: Question) => {
        console.log('Question created:', createdQuestion);
        this.router.navigate(['/questions', createdQuestion.id]);
      },
      (error) => {
        console.error('Error creating question:', error);
      }
    );
  }
}

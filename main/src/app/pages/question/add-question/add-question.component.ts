import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuestionService} from '../../../services/question.service';
import {Router} from '@angular/router';

@Component({
  selector: 'add-question-page',
  templateUrl: './add-question.component.html'
})
export class AddQuestionComponent implements OnInit {
  formQuestion: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private _router: Router,
              private _questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.formQuestion = this._formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      priority: ['', Validators.required],
    })
  }

  addQuestion() {
    this._questionService.createQuestion(this.formQuestion.value).subscribe(res => {
      console.log(res);
      this._router.navigateByUrl('/dashboard');
    })
  }
}

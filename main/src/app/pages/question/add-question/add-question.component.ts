import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuestionService} from '../../../services/question.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'add-question-page',
  templateUrl: './add-question.component.html'
})
export class AddQuestionComponent implements OnInit {
  formQuestion: FormGroup;
  isUpdating: boolean = false;

  constructor(private _formBuilder: FormBuilder,
              private _router: Router,
              private activatedRoute: ActivatedRoute,
              private _questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.formQuestion = this._formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      content: ['', Validators.required],
      priority: ['', Validators.required],
    })
    this.activatedRoute.params.subscribe((res: any) => {
      console.log(res?.id)
      if (res?.id) {
        this.isUpdating = true;
        this._questionService.getQuestionById(res?.id).subscribe(result => {
          console.log(result)
          this.formQuestion.patchValue({
            id: result?.id,
            title: result?.title,
            content: result?.content,
            priority: result?.priority,
          })
        })
      }
    })
  }

  addQuestion() {
    this._questionService.createQuestion(this.formQuestion.value).subscribe(res => {
      console.log(res);
      this._router.navigateByUrl('/dashboard');
    })
  }

  editQuestion() {
    this._questionService.updateQuestion(this.formQuestion.value).subscribe(res => {
      console.log(res);
      this._router.navigateByUrl('/dashboard');
    })

  }
}

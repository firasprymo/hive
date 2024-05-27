import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from '../../../services/question.service';
import {Question} from '../../../shared/model/question.types';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-detail-question',
  templateUrl: './detail-question.component.html'
})
export class DetailQuestionComponent implements OnInit {
  question: Question;
  formReponse: FormGroup

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      this.questionService.getQuestionById(res?.id).subscribe(question => {
        console.log(question)
        this.question = question;
      })
    })
    this.formReponse = this.formBuilder.group({
      content: ['', Validators.required]
    })
  }

  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  addReponse(): void {
    this.questionService.addReponseToQuestion(this.formReponse.value, this.question.id).subscribe(res => {
      console.log(res)
    })
  }
}

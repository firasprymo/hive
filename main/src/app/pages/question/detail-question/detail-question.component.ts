import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from '../../../services/question.service';
import {Question} from '../../../shared/model/question.types';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReponseService} from '../../../services/reponse.service';
import {Reponse} from '../../../shared/model/reponse.types';

@Component({
  selector: 'app-detail-question',
  templateUrl: './detail-question.component.html'
})
export class DetailQuestionComponent implements OnInit {
  question: Question;
  formReponse: FormGroup
  isUpdating: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private reponseService: ReponseService,
              private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      this.getQuestionById(res?.id);
    })
    this.formReponse = this.formBuilder.group({
      id: [''],
      content: ['', Validators.required]
    })
  }

  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  getQuestionById(id: number | undefined) {
    this.questionService.getQuestionById(id).subscribe(question => {
      console.log(question)
      this.question = question;
    })

  }

  addReponse(): void {
    this.questionService.addReponseToQuestion(this.formReponse.value, this.question.id).subscribe(res => {
      this.question = {};
      this.formReponse.reset()
      this.getQuestionById(res?.id);
    })
  }

  removeReponse(id: number | undefined, index: number) {
    this.reponseService.removeReponse(id).subscribe(res => {
      this.question.reponses?.splice(index, 1);
    })

  }

  setContent(item: Reponse) {
    this.isUpdating = true;
    this.formReponse.patchValue({
      id: item?.id,
      content: item?.content
    })
  }

  editReponse() {
    this.reponseService.updateReponse(this.formReponse.value).subscribe(res => {
      console.log(res)
      this.formReponse.reset()
      this.isUpdating = false;
      this.getQuestionById(this.question.id);
    })

  }
}

import {Component, ViewEncapsulation, ViewChild, OnInit} from '@angular/core';
import {QuestionService} from '../../services/question.service';
import {Question} from '../../shared/model/question.types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppDashboardComponent implements OnInit {


  displayedColumns: string[] = ['vote', 'assigned', 'title', 'priority', 'budget'];
  dataSource: Question[];

  constructor(private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.questionService.getAllQuestions().subscribe(res => {
      console.log(res);
      this.dataSource = res;
    })

  }

  deleteQuestion(element: any, index: number) {
    console.log(index)
    this.questionService.deleteQuestion(element?.id).subscribe(res => {
      this.getAllQuestions();
    })
  }

  voteUpQuestion(element: Question, i: number) {
    this.questionService.voteUpQuestion(element).subscribe(res => {
      this.getAllQuestions();
    })

  }

  voteDownQuestion(element: Question, i: number) {
    this.questionService.voteDownQuestion(element).subscribe(res => {
      this.getAllQuestions();
    })

  }
}

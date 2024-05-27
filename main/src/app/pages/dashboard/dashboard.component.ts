import {Component, ViewEncapsulation, ViewChild, OnInit} from '@angular/core';
import {QuestionService} from '../../services/question.service';
import {Question} from '../../shared/model/question.types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppDashboardComponent implements OnInit {


  displayedColumns: string[] = ['assigned', 'title', 'priority', 'budget'];
  dataSource: Question[];

  constructor(private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.questionService.getAllQuestions().subscribe(res => {
      console.log(res);
      this.dataSource = res;
    })
  }
}

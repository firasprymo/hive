import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {QuestionService} from '../../services/question.service';
import {Question} from '../../shared/model/question.types';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppDashboardComponent implements OnInit {
  formSearch: FormGroup

  displayedColumns: string[] = ['vote', 'assigned', 'title', 'priority', 'budget'];
  dataSource: Question[];

  constructor(private questionService: QuestionService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getAllQuestions();
    this.formSearch = this.formBuilder.group({
      search: ['']
    })
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

  filterQuestion() {
    const lowercaseQuery = this.formSearch.value.search.trim().toLowerCase();
    if (!lowercaseQuery) {
      this.getAllQuestions(); // Assurez-vous de stocker les données originales dans originalDataSource
      return;
    }
    this.dataSource = this.dataSource.filter((question) => {
      for (const key in question) {
        if (question.hasOwnProperty(key)) {
          const value = question[key];
          // Vérifier si la valeur correspond à la recherche
          if (this.valueMatchesSearch(value, lowercaseQuery)) {
            return true;
          }
        }
      }
      return false;
    });
  }


  private valueMatchesSearch(value: any, lowercaseQuery: string): boolean {
    if (Array.isArray(value)) {
      return value.some(item => this.valueMatchesSearch(item, lowercaseQuery));
    } else if (typeof value === 'object' && value !== null) {
      return Object.values(value).some(item => this.valueMatchesSearch(item, lowercaseQuery));
    } else if (typeof value === 'string') {
      return value.toLowerCase().includes(lowercaseQuery);
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      return value.toString().toLowerCase().includes(lowercaseQuery);
    }
    return false;
  }


}

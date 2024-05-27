import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgApexchartsModule} from 'ng-apexcharts';
// icons
import {TablerIconsModule} from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import {MaterialModule} from '../../../material.module';
import {AddQuestionRoutes} from './detail-question.routing.module';
import {DetailQuestionComponent} from './detail-question.component';

@NgModule({
  declarations: [DetailQuestionComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    RouterModule.forChild(AddQuestionRoutes),
    TablerIconsModule.pick(TablerIcons),
    ReactiveFormsModule,
  ],
  exports: [TablerIconsModule],
})
export class DetailQuestionModule {
}

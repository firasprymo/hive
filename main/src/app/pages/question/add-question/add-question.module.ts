import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgApexchartsModule} from 'ng-apexcharts';
// icons
import {TablerIconsModule} from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import {MaterialModule} from '../../../material.module';
import {AddQuestionComponent} from './add-question.component';
import {AddQuestionRoutes} from './add-question.routing.module';

@NgModule({
  declarations: [AddQuestionComponent],
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
export class AddQuestionModule {
}

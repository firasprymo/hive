import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth-components/login/login.component';
import { SignupComponent } from './auth-components/signup/signup.component';
import { QuestionListComponent } from './question/question-list.component';
import { AppDashboardComponent } from './dashbord/dashbord.component';
import { FullComponent } from './layouts/full/full.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect empty path to '/login'
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'question', component: QuestionListComponent },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'dashboard',
        component: AppDashboardComponent
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
      },
    ],
  },
  // Add more routes for other components as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

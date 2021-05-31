import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { ExamListComponent } from './exam-list/exam-list.component'
import { ExamComponent } from './exam/exam.component'
import { ExamResultComponent } from './exam-result/exam-result.component'
import { ExamHistoryComponent } from './exam-history/exam-history.component'

const routes: Routes = [
  { path: '', redirectTo: '/exams', pathMatch: 'full' },
  { path: 'exams', component: ExamListComponent },
  { path: 'exam/:id', component: ExamComponent },
  { path: 'exam-result', component: ExamResultComponent },
  { path: 'exam-histories', component: ExamHistoryComponent },
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}

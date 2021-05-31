import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { ExamListComponent } from './exam-list/exam-list.component'
import { ExamComponent } from './exam/exam.component'
import { ExamResultComponent } from './exam-result/exam-result.component'
import { ExamHistoryComponent } from './exam-history/exam-history.component'
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";


@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, HttpClientModule, AppRoutingModule, NativeScriptUIChartModule ],
  declarations: [AppComponent, ExamListComponent , ExamComponent, ExamResultComponent , ExamHistoryComponent],
  providers: [HttpClientModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}

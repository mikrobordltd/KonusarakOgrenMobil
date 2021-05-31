import { Question } from "./../models/Question";
import { RouterExtensions } from "@nativescript/angular";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Exam } from "../models/Exam";
import { ObservableArray } from "@nativescript/core";
import { ExamHistoryService } from "../services/exam-history.service";

@Component({
  selector: "exam-result",
  templateUrl: "./exam-result.component.html",
  styleUrls: ["./exam-result.component.css"]
})
export class ExamResultComponent implements OnInit {
  exam: Exam;
  chartSource: { Answer: string; Count: number }[]= [];
  correctAnswersCount:number = 0;
  incorrectAnswersCount:number = 0;
  percentage:number = 0;

  constructor(
    private router: RouterExtensions,
    private activeRoute: ActivatedRoute,
    private examHistoryService : ExamHistoryService
  ) {
    this.exam = this.router.router.getCurrentNavigation().extras.state.exam;
     this.correctAnswersCount = this.exam.Questions.filter(x=> x.TrueOption == x.UserSelectedOption).length;
     this.incorrectAnswersCount = this.exam.Questions.length - this.correctAnswersCount;
     this.percentage = parseInt((this.correctAnswersCount / this.exam.Questions.length * 100).toString());
    this.chartSource = [
      { Answer: "Dogru", Count: this.correctAnswersCount },
      { Answer: "Yanlis", Count: this.incorrectAnswersCount }
    ];
    this.examHistoryService.add(this.exam.Title , this.correctAnswersCount, this.exam.Questions.length);
  }

  ngOnInit() {}
}

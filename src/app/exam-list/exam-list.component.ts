import { ExamsService } from "./../services/exams.service";
import { Exam } from "./../models/Exam";
import { Component, OnInit } from "@angular/core";
import { Question } from "../models/Question";
import { Button, EventData } from "@nativescript/core";
import { RouterExtensions } from "@nativescript/angular";

@Component({
  selector: "ns-exams",
  templateUrl: "./exam-list.component.html"
})
export class ExamListComponent implements OnInit {
  items : Exam[];
  _isLoading = true;

  constructor(private examService: ExamsService, private router: RouterExtensions) {}

   ngOnInit(): void {
    this.examService.getExams().subscribe(res => {
      this.items = res;
    })


  }

  onStartExamButton_Clicked(args : EventData, examId : number)
  {
    var button = args.object as Button;
    this.router.navigate(['/exam', examId]);
  }

}


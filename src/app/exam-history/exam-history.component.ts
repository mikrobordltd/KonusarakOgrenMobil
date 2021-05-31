import { RouterExtensions } from "@nativescript/angular";
import { Component, OnInit } from "@angular/core";
import { ExamHistory } from "../models/ExamHistory";
import { ExamHistoryService } from "../services/exam-history.service";

@Component({
  selector: "exam-history",
  templateUrl: "./exam-history.component.html",
  styleUrls: ["./exam-history.component.css"]
})
export class ExamHistoryComponent implements OnInit {
  historyItems : ExamHistory[];

  constructor(private routerExtensions: RouterExtensions,
    private examHistoryService : ExamHistoryService
    ) {
      this.historyItems = examHistoryService.getAll();

  }

  ngOnInit() {}

  goBack() {
    this.routerExtensions.backToPreviousPage();
  }
}

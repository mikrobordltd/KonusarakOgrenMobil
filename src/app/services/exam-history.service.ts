import { Injectable } from "@angular/core";
import { ApplicationSettings } from "@nativescript/core";
import { ExamHistory } from "../models/ExamHistory";

@Injectable({
  providedIn: "root"
})
export class ExamHistoryService {
  constructor() {}

  getAll(): ExamHistory[] {
    debugger;
    var historyAsJson = ApplicationSettings.getString("exam-history-data");
    if (historyAsJson == null) return [];
    return JSON.parse(historyAsJson);
  }

  add(title : string, correctAnswersCount : number , totalCount : number):void{
    var all = this.getAll();
    all.unshift({Title : title, CorrectAnswersCount : correctAnswersCount, TotalCount : totalCount});
    ApplicationSettings.setString("exam-history-data", JSON.stringify(all));
  }
}

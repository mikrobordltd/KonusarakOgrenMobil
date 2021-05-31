import { Injectable } from "@angular/core";
import { Exam } from "../models/Exam";
import { Http } from "@nativescript/core";
import { Question } from "../models/Question";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ExamsService {
  private apiUrl = "http://192.168.0.14:1212/api/";


  constructor(private http: HttpClient) { }

  public getExams() : Observable<Exam[]>{
    return this.http
         .get<Exam[]>(this.apiUrl + "exams");
  }

  public getExamDetails(id : number) : Observable<Exam>{
    return this.http
         .get<Exam>(this.apiUrl + "exams/" + id);
  }

}

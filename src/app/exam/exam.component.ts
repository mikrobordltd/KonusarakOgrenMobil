import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from "@angular/core";
import { ActivatedRoute, Route } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import {
  Button,
  Color,
  EventData,
  GridLayout,
  Page,
  View,
  ViewBase
} from "@nativescript/core";
import { Exam } from "../models/Exam";
import { ExamsService } from "../services/exams.service";
import { Dialogs } from "@nativescript/core";
import { ExamHistoryService } from "../services/exam-history.service";

@Component({
  selector: "ns-exam",
  templateUrl: "./exam.component.html"
})
export class ExamComponent implements OnInit, AfterViewInit {
  item: Exam;
  currentQuestionIndex: number = 0;
  counter: number = 60 * 5;
  remaningTime: string = "";
  timer: any;
  nextButton: Button;
  optionButtons: Button[] = [];
  isExamLoaded: boolean = false;

  @ViewChild("questionarea") gridlayout: ElementRef;

  constructor(
    private examsService: ExamsService,
    private activatedRoute: ActivatedRoute,
    private route: RouterExtensions,
    private changeDetectorRef: ChangeDetectorRef,
    private examHistoryService : ExamHistoryService
  ) {}

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.params.id;
    this.examsService.getExamDetails(id).subscribe(res => {
      this.item = res;
      this.isExamLoaded = true;
      this.startTimer();
      this.initalizeDomButtons();
    });
  }

  ngAfterViewInit(): void {}

  initalizeDomButtons(): void {
    this.changeDetectorRef.detectChanges(); // not required

    let gridLayout: GridLayout = this.gridlayout.nativeElement as GridLayout;

    this.optionButtons.push(gridLayout.getViewById("btnOptionA"));
    this.optionButtons.push(gridLayout.getViewById("btnOptionB"));
    this.optionButtons.push(gridLayout.getViewById("btnOptionC"));
    this.optionButtons.push(gridLayout.getViewById("btnOptionD"));
    this.optionButtons.push(gridLayout.getViewById("btnOptionE"));
    this.nextButton = gridLayout.getViewById("btnNextQuestion");
  }

  startTimer(): void {
    this.timer = setInterval(() => {
      this.counter--;
      this.remaningTime = this.formattedMS(this.counter);
      if (this.counter == 0) {
        this.stopTimer();
        Dialogs.alert({
          title: "SINAV BİTTİ",
          message: "Malesef süreniz bitti",
          okButtonText: "Tamam"
        }).then(() => {
          this.showExamResult();
      });
      }
    }, 1000);
  }
  stopTimer(): void {
    clearInterval(this.timer);
  }

  formattedMS(seconds): string {
    return (
      (seconds - (seconds %= 60)) / 60 + (9 < seconds ? ":" : ":0") + seconds
    );
  }

  onOptionClicked(args: EventData, option: number): void {
    this.item.Questions[this.currentQuestionIndex].UserSelectedOption = option;
    for (var i in this.optionButtons) {
      var optBtn = this.optionButtons[i];
      optBtn.style.fontWeight = "normal";
      optBtn.style.color = new Color("black");
    }

    let btn = args.object as Button;
    btn.style.fontWeight = "bold";
    btn.style.color = new Color("green");

    this.nextButton.style.visibility = "visible";
  }

  showNextQuestionClicked(): void {
    if (this.item.Questions.length - 1 == this.currentQuestionIndex) {
      this.showExamResult();
    } else {
      this.currentQuestionIndex++;
      this.prepareButtonsForNewQuestion();
    }
  }

  showExamResult(): void {
    this.stopTimer();
    this.route.navigate(["exam-result"], { state: { exam: this.item } });
  }

  prepareButtonsForNewQuestion(): void {
    for (var i in this.optionButtons) {
      var optBtn = this.optionButtons[i];
      optBtn.style.fontWeight = "normal";
      optBtn.style.color = new Color("black");
    }
    this.nextButton.visibility = "hidden";
  }
}

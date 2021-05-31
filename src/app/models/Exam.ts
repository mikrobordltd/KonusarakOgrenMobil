import { Question } from "./Question";

export interface Exam{
  Id : number,
  Title : string,
  Questions : Array<Question>
}

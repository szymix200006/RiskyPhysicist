import { Question } from "./question";

export interface QuestionResponse {
    level: string;
    questions: Question[];
}

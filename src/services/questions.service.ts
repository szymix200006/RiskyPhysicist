import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GameModes } from '../interfaces/game-modes';
import { QuestionResponse } from '../interfaces/question-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private readonly QUESTRIONS_URI = 'https://risky-physicist-backend-production.up.railway.app/';
  private http = inject(HttpClient);

  getQuestions(level: GameModes): Observable<QuestionResponse> {
    return this.http.get<QuestionResponse>(`${this.QUESTRIONS_URI}${level}`);
  }

  constructor() { }
}

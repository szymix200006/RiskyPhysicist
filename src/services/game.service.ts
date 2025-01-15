import { computed, inject, Injectable, OnInit, Signal, signal } from '@angular/core';
import { GameState } from '../interfaces/game-state';
import { Player } from '../interfaces/player';
import { SettingsService } from './settings.service';
import { QuestionsService } from './questions.service';
import { Question } from '../interfaces/question';
import { Observable } from 'rxjs';
import { QuestionResponse } from '../interfaces/question-response';
import { GameModes } from '../interfaces/game-modes';
import { raw, response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class GameService{
  private players = signal<Player[]>([
    {id: 1, name: 'Player1', balance: 200},
    {id: 2, name: 'Player2', balance: 400},
    {id: 3, name: 'Player3', balance: 2400},
    {id: 4, name: 'Player5', balance: 2030},
    {id: 5, name: 'Player4', balance: 20000},
    {id: 6, name: 'Player6', balance: 2010},
  ]);
  private sortedPlayers = computed(() => this.players().sort((player1, player2) => player2.balance - player1.balance));
  private questions: Question[] = [];
  private questionsService = inject(QuestionsService);
  private settings = inject(SettingsService)

  private generatePlayers(): Player[] {
    let players: Player[] = [];
    for(let i = 0; i < this.settings.getPlayersCount()(); i++) {
      players.push({
        id: i,
        name: `Player${i}`,
        balance: this.settings.getStartingBalance()
      })
    }
    return players;
  }

  private generateQuestions(rawQuestions: QuestionResponse) {
    const {questions} = rawQuestions;
        for(let i = questions.length - 1; i > 0; i--) {
          const randomIndex = Math.round(Math.random() * (i + 1));
          [questions[i], questions[randomIndex]] = [questions[randomIndex], questions[i]];
        }
        return questions.slice(0, this.settings.getRounds());
  }
     
  initializeGame() {
    this.players.set(this.generatePlayers());
    this.questionsService.getQuestions(this.settings.getGameMode()()).subscribe({
      next: response => {
        this.questions = this.generateQuestions(response);
      },
      error: error => {
        throw error;
      }
    });
  }
  
  getPlayers(): Signal<Player[]> {
    return this.players.asReadonly();
  }

  getSortedPlayers(): Signal<Player[]> {
    return this.sortedPlayers;
  }

  constructor() { 
    
  }
}

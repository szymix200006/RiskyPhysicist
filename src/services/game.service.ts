import { computed, inject, Injectable, Signal, signal, Type, ViewContainerRef } from '@angular/core';
import { Player } from '../interfaces/player';
import { SettingsService } from './settings.service';
import { QuestionsService } from './questions.service';
import { Question } from '../interfaces/question';
import { QuestionResponse } from '../interfaces/question-response';
import { ModalService } from './modal.service';
import { QuestionModalComponent } from '../components/question-modal/question-modal.component';
import { AnswerModalComponent } from '../components/answer-modal/answer-modal.component';
import { InfoModalComponent } from '../components/info-modal/info-modal.component';
import { BetModalComponent } from '../components/bet-modal/bet-modal.component';
import { ScoreModalComponent } from '../components/score-modal/score-modal.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingModalComponent } from '../components/loading-modal/loading-modal.component';

@Injectable({
  providedIn: 'root'
})
export class GameService{
  private players = signal<Player[]>([]);
  private sortedPlayers = computed(() => this.players().sort((player1, player2) => player2.balance - player1.balance));

  private questions: Question[] = [];
  private questionsService = inject(QuestionsService);
  private answers = signal<number[]>([]);

  private settings = inject(SettingsService);
  private gameSubscription!: Subscription;
  private isLoading = signal<boolean>(false);

  private modal = inject(ModalService);
  private isPortalVisible = signal<boolean>(true);

  private currentRoundAnswers: number[] = [];
  private currentView: ViewContainerRef | null = null;
  private currentTimeOut: ReturnType<typeof setTimeout> | null = null;
  private currentPlayerId!: number;
  private currentQuestion!: Question;
  private currentGoal!: number;
  private resolveFn!: () => void;
  private resolveBet!: () => void;
 
  private router = inject(Router);

  private generatePlayers(): Player[] {
    let players: Player[] = [];
    for(let i = 0; i < this.settings.getPlayersCount()(); i++) {
      players.push({
        id: i,
        name: `Player${i}`,
        balance: this.settings.getStartingBalance(),
        currentBet: 0,
        currentAnswer: 0,
        currentMultiplier: 0
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
     
  initializeGame(viewContainerRef: ViewContainerRef) {
    this.isLoading.set(true);
    this.players.set(this.generatePlayers());
    this.gameSubscription = this.questionsService.getQuestions(this.settings.getGameMode()()).subscribe({
      next: response => {
        this.isLoading.set(false);
        this.questions = this.generateQuestions(response);
        this.startGameLoop(viewContainerRef);
      },
      error: () => {
        throw new Error("Failed to load questions");
      }
    });
  }

  getIsLoading(): Signal<boolean> {
    return this.isLoading.asReadonly();
  }
  
  getPlayers(): Signal<Player[]> {
    return this.players.asReadonly();
  }

  getSortedPlayers(): Signal<Player[]> {
    return this.sortedPlayers;
  }

  getIsPortalVisible(): Signal<boolean> {
    return this.isPortalVisible.asReadonly();
  }

  getCurrentRoundAnswers(): number[] {
    return this.currentRoundAnswers;
  }

  clearCurrentRoundAnswers(): void {
    this.currentRoundAnswers = [];
  }

  addAnswer(answer: number): void {
    this.currentRoundAnswers.push(answer);
  }

  showModule<T>(component: Type<T>, viewContainerRef: ViewContainerRef, inputs: {name: string, value: any}[], duration?: number): Promise<void> {
    return new Promise((resolve) => {
      this.resolveFn = resolve;
      this.currentView = viewContainerRef;
      this.isPortalVisible.set(true);
      this.modal.attach(component, viewContainerRef, inputs);
      if(duration) {
        this.currentTimeOut = setTimeout(() => {
          this.modal.detach(viewContainerRef);
          this.isPortalVisible.set(false);
          resolve();
        }, duration);
      } 
    })
  }

  closeModule(): void {
    this.isPortalVisible.set(false);
    if(this.currentView) {
      if(this.currentTimeOut) clearInterval(this.currentTimeOut);
      this.modal.detach(this.currentView);
      this.resolveFn();
    } 
  }

  private setAnswers(): void {
    this.answers.set(this.currentRoundAnswers);
    this.currentRoundAnswers = [];
  }

  getAnswers(): Signal<number[]> {
    return this.answers.asReadonly();
  }

  startBet(): Promise<void> {
    return new Promise(resolve => {
      this.resolveBet = resolve;
    });
  }

  bet(currentMultiplier: number, currentAnswer: number): void {
    const currentPlayers = this.players();
    const newPlayers = currentPlayers.map(player => {
      if(player.id === this.currentPlayerId) return {...player, currentAnswer, currentMultiplier};
      return player;
    })
    this.players.set(newPlayers);
    this.resolveBet();
  }

  getQuestion(): Question {
    this.currentQuestion = this.questions.pop()!;
    return this.currentQuestion;
  }

  getClosestAnswer(): number {
    this.currentGoal = this.currentQuestion.answer;;
    if(this.answers().includes(this.currentGoal)) return this.currentGoal;
    else {
      return this.answers().reduce((prev, curr) => Math.abs(curr - this.currentGoal) < Math.abs(prev - this.currentGoal) ? curr : prev);
    }
  }

  setPlayerBet(playerId: number, currentBet: number) {
    const currentPlayers = this.players();
    const newPlayers = currentPlayers.map(player => player.id === playerId ? {...player, currentBet} : player);
    this.players.set(newPlayers);
  }

  setScores(): void {
    const correctAnswer = this.getClosestAnswer();
    const currentPlayers = this.players();
    const newPlayers = currentPlayers.map(player => {
      let balance = player.currentAnswer === correctAnswer ? (player.balance-player.currentBet) + (player.currentBet * player.currentMultiplier) : player.balance - player.currentBet;
      if(balance === 0) balance += 100;
      return {...player, balance};
    })
    this.players.set(newPlayers);
  }

  resetAnswers(): void {
    this.answers.set([]);
  }

  async startGameLoop(viewContainerRef: ViewContainerRef) {
    for(let round = 0; round < this.settings.getRounds(); round++) {
      await this.showModule(QuestionModalComponent, viewContainerRef, [{ name: 'question', value: this.getQuestion() }, { name: 'duration', value: 10000 }], 10000);
      for(let playerIndex = 0; playerIndex < this.settings.getPlayersCount()(); playerIndex++) {
        this.isPortalVisible.set(true)
        await this.showModule(AnswerModalComponent, viewContainerRef, [{ name: 'currentPlayerName', value: this.getPlayers()()[playerIndex].name }, { name: 'duration', value: 15000 }], 15000);
      }
      this.setAnswers();
      await this.showModule(InfoModalComponent, viewContainerRef, []);
      for(let playerIndex = 0; playerIndex < this.settings.getPlayersCount()(); playerIndex++) {
        this.currentPlayerId = playerIndex;
         await this.showModule(BetModalComponent, viewContainerRef, [{name: 'currentPlayer', value: this.getPlayers()()[playerIndex]}]);
         await this.startBet();
      }
      this.setScores();
      if(round < this.settings.getRounds() - 1) await this.showModule(ScoreModalComponent, viewContainerRef, [{name: 'answer', value: this.getClosestAnswer()}, {name: 'duration', value: 15000}], 15000);
      else await this.showModule(ScoreModalComponent, viewContainerRef, [{name: 'answer', value: this.getClosestAnswer()}, {name: 'duration', value: 15000}, {name: 'scores', value: false}], 15000);
      this.resetAnswers();
    }
    this.gameSubscription.unsubscribe();
    this.router.navigate(['/ending']);
  }

  constructor() { 
    
  }
}

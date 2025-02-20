import { Component, computed, Inject, inject, OnInit, PLATFORM_ID, ViewChild, ViewContainerRef } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { QuestionModalComponent } from "../../components/question-modal/question-modal.component";
import { AnswerModalComponent } from "../../components/answer-modal/answer-modal.component";
import { BetModalComponent } from "../../components/bet-modal/bet-modal.component";
import { ScoreModalComponent } from "../../components/score-modal/score-modal.component";
import { GameService } from '../../services/game.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LoadingModalComponent } from "../../components/loading-modal/loading-modal.component";

@Component({
  selector: 'app-game',
  imports: [CommonModule, LoadingModalComponent],
  template: `
    <main class="w-screen h-screen bg-emerald-600 flex flex-row items-center justify-evenly">
      @for(stake of stakes; track stake; let i = $index) {
        <button [disabled]="sortedAnswers()[i] === undefined" class="h-4/5 w-1/5 border-8 bg-transparent rounded-3xl border-white hover:scale-110 duration-500 ease-in-out text-3xl text-white font-extrabold p-4 flex flex-col items-center justify-end box-border" (click)="onBetClick(stake, sortedAnswers()[i])">
          @if(sortedAnswers()[i] !== undefined) {
            <span class="py-10 px-5 border-2 rounded-md bg-white text-black text-bold w-2/3 border-sky-500 m-auto">{{sortedAnswers()[i]}}</span>
          }
          1 to {{stake}}
        </button>
      }
      
      <div [className]="modalPlaceHolderStyle()">
        <ng-container #appModalPlaceHolder></ng-container>
      </div>

      @if(game.getIsLoading()()) {
        <div class="z-10 absolute w-screen h-screen">
          <app-loading-modal/>
        </div>
      }
    </main>
  `,
})
export class GameComponent implements OnInit {
  settings = inject(SettingsService);
  game = inject(GameService);
  stakes = this.settings.getStakes();
  isPortalVisible = this.game.getIsPortalVisible();
  answers = this.game.getAnswers();
  sortedAnswers = computed(() => [...new Set(this.answers().sort((answer1, answer2) => answer1 - answer2))]);
  modalPlaceHolderStyle = computed(() => {
    if(this.isPortalVisible()) return 'z-10 absolute w-screen h-screen';
    else return '';
  });

  @ViewChild('appModalPlaceHolder', {read: ViewContainerRef, static: true}) modalContainer!: ViewContainerRef;
  @Inject(PLATFORM_ID) private platformId: any;

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      this.game.initializeGame(this.modalContainer);
    }
    
  }

  onBetClick(stake: number, answer: number): void {
    this.game.bet(stake, answer);
  }
}

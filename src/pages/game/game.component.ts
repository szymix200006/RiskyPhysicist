import { Component, inject } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { QuestionModalComponent } from "../../components/question-modal/question-modal.component";
import { AnswerModalComponent } from "../../components/answer-modal/answer-modal.component";
import { BetModalComponent } from "../../components/bet-modal/bet-modal.component";
import { ScoreModalComponent } from "../../components/score-modal/score-modal.component";

@Component({
  selector: 'app-game',
  imports: [ScoreModalComponent],
  template: `
    <main class="w-screen h-screen bg-emerald-600 flex flex-row items-center justify-evenly">
      @for(stake of stakes; track stake) {
        <button class="h-4/5 w-1/5 border-8 bg-transparent rounded-3xl border-white hover:scale-110 duration-500 ease-in-out text-3xl text-white font-extrabold p-4 flex flex-column items-end justify-center box-border">
          1 to {{stake}}
        </button>
      }
      <div class="z-10 absolute w-full h-full">
        <app-score-modal/>
      </div>
    </main>
  `,
})
export class GameComponent {
  settings = inject(SettingsService);
  stakes = this.settings.getStakes();
  // for(tury) {
  //   -losuj pytanie
  //   for(players){
  //   -odpowiedz
  //   }
  //   -ustaw
  //   for(players){
  //   -obstaw(ile, gdzie)
  //   }
  //   -rozdaj kase(okienko z wynikami i aktualnym stanem konta)
  //   }
  //   -okienko z tabelą

  //interfaces - player, question, question-request
  //funkcje - losuj pytanie, 
  //svg dla planszy - najmniejsza(1/2), 1/3, 1/4, najwieksza(1/5)
}

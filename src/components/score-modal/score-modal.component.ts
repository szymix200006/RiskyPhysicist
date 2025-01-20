import { Component, inject, Input } from '@angular/core';
import { GameService } from '../../services/game.service';
import { TimerComponent } from "../timer/timer.component";

@Component({
  selector: 'app-score-modal',
  imports: [TimerComponent],
  template: `
    <main class="w-screen h-screen flex items-center justify-center">
      <section class="w-1/3 h-1/2 border-4 border-white rounded-xl bg-amber-300 flex flex-col items-center justify-evenly text-white box-border p-4">
        <h1 class="text-3xl font-extrabold text-center">The closest answer was {{answer}}</h1>
        <h1 class="text-3xl font-extrabold">Current results</h1>
        <section class="w-fit h-fit flex flex-col items-start justify-evenly">
          @for(player of players(); track player.id; let i = $index){
            <span class="font-bold text-2xl">{{i+1}}.&nbsp;&nbsp;{{player.name}}&nbsp;&nbsp;-&nbsp;&nbsp;{{player.balance}}$</span>
          }@empty {
            <span class="text-red-500 font-bold text-2xl">No players were initialized</span>
          }
        </section>
        <div class="w-2/3 h-fit">
          <app-timer [duration]="duration"/>
        </div>
      </section>
    </main>
  `,
  styleUrl: './score-modal.component.css'
})
export class ScoreModalComponent {
  game = inject(GameService);
  @Input() answer!: number;
  @Input() duration!: number;
  readonly players = this.game.getSortedPlayers();
}

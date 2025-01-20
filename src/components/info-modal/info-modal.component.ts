import { Component, inject } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-info-modal',
  imports: [],
  template: `
    <main class="w-screen h-screen bg-transparent flex flex-col items-center justify-end border-box p-5">
      <div class="w-3/4 py-5 border-white bg-amber-300 border-4 rounded-lg flex flex-row items-center justify-evenly">
        <p class="text-3xl text-white">Now its time to place your bets!</p>
        <button class="text-3xl text-white bg-sky-500 rounded-md px-10 py-5 hover:scale-110 duration-300 ease-in-out" (click)="this.game.closeModule()">Next</button>
      </div>
    </main>
  `,
  styleUrl: './info-modal.component.css'
})
export class InfoModalComponent {
  game = inject(GameService);
}

import { Component, inject } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { GameModes } from '../../interfaces/game-modes';
import { Router } from '@angular/router';
import { QuestionModalComponent } from "../../components/question-modal/question-modal.component";
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-menu',
  imports: [ReactiveFormsModule],
  template: `
    <main class="w-screen h-screen flex justify-center items-center bg-amber-300">
      <form [formGroup]="settingsForm" (submit)="submitSettingsForm()" class="flex flex-col items-center justify-between h-1/3">
        <section>
          <div class="flex flex-row text-5xl text-white flex items-center justify-between gap-10">
            <label for="playersCount" class="font-bold">Players </label>
            <div class="grid grid-cols-3 grid-rows-1 place-items-center cursor-pointer">
              @if(playersCount!.value! > this.minPlayers) {
                <span class="material-symbols-outlined text-4xl font-extrabold" (click)="updatePlayersCount(-1)">chevron_left</span> 
              }
              <input type="number" id="playersCount" formControlName="playersCount" [min]="this.minPlayers" [max]="this.maxPlayers" size="1" class="text-center bg-transparent col-start-2 animate-pulse">
              @if(playersCount!.value! < this.maxPlayers) {
                <span class="material-symbols-outlined text-4xl font-extrabold" (click)="updatePlayersCount(1)">chevron_right</span>
              }
            </div>
          </div>
        </section>
        <section>
          <div class="flex flex-row text-5xl text-white flex items-center justify-center gap-2">
            <label for="gameMode" class="font-bold">Game mode </label>
            <div class="grid grid-cols-3 grid-rows-1 place-items-center cursor-pointer w-2/5">
              @if(gameMode!.value! !== gameModes[0]) {
                <span class="material-symbols-outlined text-4xl font-extrabold" (click)="updateGameMode(-1)">chevron_left</span> 
              }
              <input type="text" id="gameMode" formControlName="gameMode" [value]="this.gameMode" size="11" class="text-center bg-transparent col-start-2 animate-pulse">
              @if(gameMode!.value! !== gameModes[gameModes.length - 1]) {
                <span class="material-symbols-outlined text-4xl font-extrabold" (click)="updateGameMode(1)">chevron_right</span>
              }
            </div>
          </div>
        </section>
        <button type="submit"  class="text-3xl text-white bg-sky-500 rounded-md px-10 py-5 hover:scale-110 duration-300 ease-in-out">Let's Play</button>
      </form>
    </main>
  `,
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  private readonly settingsService = inject(SettingsService);
  private readonly game = inject(GameService);
  private readonly router = inject(Router);
  gameModes = Object.values(GameModes);
  maxPlayers = this.settingsService.getMaxPlayers();
  minPlayers = this.settingsService.getMinPlayers();
  
  settingsForm = new FormGroup({
    playersCount: new FormControl({value: this.minPlayers, disabled: true}, [Validators.required, Validators.max(this.maxPlayers), Validators.min(this.minPlayers)]),
    gameMode: new FormControl({value: GameModes.EASY, disabled: true}, [Validators.required])
  });

  get playersCount() {
    return this.settingsForm.get('playersCount');
  }

  get gameMode() {
    return this.settingsForm.get('gameMode');
  }

  updatePlayersCount(value: number): void {
    const currentPlayersCount = this.settingsForm.value.playersCount!;
    if(currentPlayersCount <= this.maxPlayers && currentPlayersCount >= this.minPlayers) {
      this.playersCount?.setValue(currentPlayersCount + value);
    } else {
      throw new Error("Not a valid number of players.")
    }
  }

  updateGameMode(value: number): void {
    const currentGameModeIndex = this.gameModes.findIndex(index => index === this.settingsForm.value.gameMode);
    if(currentGameModeIndex >= 0 && currentGameModeIndex <= this.gameModes.length - 1) {
      this.gameMode?.setValue(this.gameModes[currentGameModeIndex + value]);
    } else {
      throw new Error("This game mode doesn't exist.")
    }
  }

  submitSettingsForm(): void {
    const playersCount = this.playersCount!.value;
    const gameMode = this.gameMode!.value;
    if(playersCount && gameMode) {
      const settings = {
        playersCount: playersCount,
        gameMode: gameMode
      }
        
      this.settingsService.setSettings(settings);
      this.router.navigate(['/game']);
    } else {
      throw new Error('Players count and game mode not specified.')
    }
  }
}

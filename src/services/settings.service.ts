import { Injectable, Signal, signal } from '@angular/core';
import { GameModes } from '../interfaces/game-modes';
import { Settings } from '../interfaces/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private playersCount = signal<number>(2);
  private gameMode = signal<GameModes>(GameModes.EASY);

  private readonly maxPlayers = 4;
  private readonly minPlayers = 2;
  private readonly rounds = 10;
  private readonly startingBalance = 1000;
  private readonly stakes = [2,3,4,5];

  private setPlayersCount(count: number): void {
    if(count >= 2 && count <= 8) {
      this.playersCount.set(count);
    } else {
      throw new Error("Players count must be a value between 2 and 8!");
    }
  }

  getPlayersCount(): Signal<number> {
    return this.playersCount.asReadonly();
  }

  private setGameMode(mode: GameModes): void {
    this.gameMode.set(mode);
  }

  getGameMode(): Signal<GameModes> {
    return this.gameMode.asReadonly();
  }

  setSettings(settings: Settings) {
    this.setPlayersCount(settings.playersCount);
    this.setGameMode(settings.gameMode);
  }

  getMaxPlayers(): number {
    return this.maxPlayers;
  }

  getMinPlayers(): number {
    return this.minPlayers;
  }

  getRounds(): number {
    return this.rounds;
  }

  getStartingBalance(): number {
    return this.startingBalance;
  }

  getStakes(): number[] {
    return this.stakes;
  }

  constructor() { }
}

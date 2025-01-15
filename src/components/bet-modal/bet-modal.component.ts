import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../interfaces/player';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-bet-modal',
  imports: [ReactiveFormsModule],
  template: `
    <form class="w-full h-full bg-black/75 flex flex-col items-center justify-evenly" [formGroup]="betForm" (submit)="onFormSubmit()">
      <h1 class="text-3xl font-extrabold text-white">{{currentPlayer.name}}'s time to bet. Balance: {{currentPlayer.balance}}</h1>
      <div class="w-full h-fit flex flex-col items-center gap-5">
      <input type="number" [max]="currentPlayer.balance" class="focus:outline-none border-2 border-amber-300 rounded-xl text-3xl py-5 px-10 text-center font-extrabold" formControlName="bet">
      @if((bet?.touched || bet?.dirty) && bet?.invalid) {
        <small class="text-red-500 text-2xl font-medium">Invalid bet</small>
      }
      </div>
      <button class="text-3xl text-white bg-sky-500 rounded-md px-10 py-5 hover:scale-110 duration-300 ease-in-out">Submit bet</button>
    </form>
  `,
  styleUrl: './bet-modal.component.css'
})
export class BetModalComponent implements OnInit{
  @Input() currentPlayer!: Player;
  maxBet!: number;

  ngOnInit():void {
    this.maxBet = this.currentPlayer.balance;
  }

  betForm = new FormGroup({
    bet: new FormControl<number | null>(null, [Validators.required, Validators.max(this.maxBet)])
  });

  get bet() {
    return this.betForm.get('bet');
  }

  onFormSubmit(): void {
    if(this.betForm.valid) {
      const bet = this.betForm.value.bet;
      if(bet) {
        console.log(bet);
      }
    }
  }
}

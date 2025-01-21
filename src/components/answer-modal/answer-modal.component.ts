import { Component, inject, Input, OnDestroy, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TimerComponent } from "../timer/timer.component";
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-answer-modal',
  imports: [ReactiveFormsModule, TimerComponent],
  template: `
    <form class="w-full h-full flex flex-col items-center justify-evenly bg-black/70" [formGroup]="answerForm" (submit)="onFormSubmit()">
      <h1 class="text-white text-4xl font-extrabold">{{currentPlayerName}}'s turn!</h1>
      <section class="w-1/3 h-2/5 border-4 rounded-xl border-sky-500 bg-white p-4 border-box">
        <input type="number" class="w-full h-full text-center focus:outline-none text-4xl font-extrabold" formControlName="answer">
      </section>
      <section class="w-1/3 h-fit">
        <app-timer [duration]="duration"/>
      </section>
      <button type="submit" class="text-3xl text-white bg-sky-500 rounded-md px-10 py-5 hover:scale-110 duration-300 ease-in-out">Submit answer</button>
    </form>
  `,
  styleUrl: './answer-modal.component.css'
})
export class AnswerModalComponent implements OnDestroy{
  @Input() currentPlayerName!: string;
  @Input() duration!: number;
  game = inject(GameService);
  answerSent = signal<boolean>(false);
  
  answerForm = new FormGroup({
    answer: new FormControl<number | null>(null, [Validators.required])
  });

  onFormSubmit(): void {
    if(this.answerForm.valid) {
      const answer = this.answerForm.value.answer;
      if(answer) {
        this.game.addAnswer(answer);
        this.answerSent.set(true);
        this.game.closeModule();
      }
    }
  }

  ngOnDestroy(): void {
    if(!this.answerSent()) {
      const answer = this.answerForm.valid && this.answerForm.value.answer ? this.answerForm.value.answer : 0;
      this.game.addAnswer(answer);
    }  
  }
}

import { Component, Input } from '@angular/core';
import { Question } from '../../interfaces/question';
import { TimerComponent } from "../timer/timer.component";

@Component({
  selector: 'app-question-modal',
  imports: [TimerComponent],
  template: `
    <main class="w-1/3 h-1/2 border-4 border-white rounded-xl bg-amber-300 flex flex-col items-center justify-evenly text-white box-border p-4">
      <h1 class="text-3xl font-extrabold">Questrion nr.{{question.id}}</h1>
      <p class="text-center text-2xl">{{question.content}}</p>
      <div class="w-full h-fit">
        <app-timer [duration]="questionTime"/>
      </div>
    </main>
  `,
  styleUrl: './question-modal.component.css'
})
export class QuestionModalComponent {
  @Input() question!: Question;
  readonly questionTime = 5000;
}

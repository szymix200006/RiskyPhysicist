import { Component, Input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-timer',
  imports: [],
  template: `
   <div class="w-full h-7 border-2 border-white rounded-full bg-black overflow-hidden">
      <div 
        class="bg-sky-500 h-full rounded-full"
        [style.width.%]="progress()"
        [style.transition]="'width 0.1s linear'"
      >
    </div>
   </div>
  `,
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnInit{
  @Input() duration!: number;
  progress = signal<number>(100);

  ngOnInit(): void {
    this.startProgress();
  }

  startProgress():void {
    const interval = 10;
    const decrement = (100 / this.duration) * interval;

    const timer = setInterval(() => {
      const currentProgress = this.progress();
      this.progress.set(Math.max(currentProgress - decrement,0));

      if(this.progress() === 0) {
        clearInterval(timer);
      }
    }, interval);
  }
}

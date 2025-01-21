import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-modal',
  imports: [],
  template:`
    <main class="w-screen h-screen flex flex-col items-center justify-center bg-stone-100 z-100">
      <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" class="animate-spin">
        <circle cx="400" cy="400" fill="none"
          r="55" stroke-width="14" stroke="#64748b" stroke-dasharray="242 1400" stroke-linecap="round"/>
      </svg>
    </main>
  `,
  styleUrl: './loading-modal.component.css'
})
export class LoadingModalComponent {

}

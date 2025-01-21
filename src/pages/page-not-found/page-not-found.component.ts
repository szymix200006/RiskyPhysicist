import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  imports: [],
  template:`
    <main class="w-screen h-screen flex flex-col items-center justify-center bg-stone-100 gap-5 p-10 border-box">
      <h1 class="text-8xl text-slate-500 font-bold">404</h1>
      <p class="text-2xl text-slate-500 font-bold">Sorry... we don't do that here</p>
      <h2 class="text-xl text-slate-500 font-extrabold mt-5">Risky Physicist™</h2>
    </main>
  `,
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {

}

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  template: `
    <main class="flex flex-col items-center justify-evenly w-full h-screen bg-amber-300 transform-none">
      <h1 class="text-8xl text-white font-extrabold z-10">Risky Physicist</h1>
      <a routerLink="/menu" class="transition ease-in-out duration-300 hover:scale-110 z-10">
        <button class="px-10 bg-sky-500 w-fit text-white rounded-md flex items-center">
          <span class="material-symbols-outlined text-7xl">play_arrow</span>
        </button>
      </a>
      <svg id="visual" viewBox="0 0 960 540" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" class="absolute w-full h-full"> 
      <defs>
        <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color: #fffbeb; stop-opacity: 1" />
          <stop offset="100%" style="stop-color: #fef3c7; stop-opacity: 1" />
        </linearGradient>
      </defs>
        <g class="fill-none stroke-[url(#gradientStroke)] stroke-2">
            <circle r="66" cx="844" cy="246" class="animate-bounce origin-[50%_50%] transform-box-fill"></circle>
            <circle r="28" cx="456" cy="448" class="animate-bounce origin-[50%_50%] transform-box-fill"></circle>
            <circle r="62" cx="230" cy="403" class="animate-spin-slow origin-[50%_50%] transform-box-fill"></circle>
            <circle r="36" cx="329" cy="287" class="animate-ping origin-[50%_50%] transform-box-fill"></circle>
            <circle r="42" cx="80" cy="37" class="animate-bounce origin-[50%_50%] transform-box-fill"></circle>
            <circle r="58" cx="590" cy="11" class="animate-spin-slow origin-[50%_50%] transform-box-fill"></circle>
            <circle r="57" cx="849" cy="517" class="animate-pulse origin-[50%_50%] transform-box-fill"></circle>
            <circle r="57" cx="590" cy="318" class="animate-pulse origin-[50%_50%] transform-box-fill"></circle>
            <circle r="50" cx="173" cy="135" class="animate-spin-slow origin-[50%_50%] transform-box-fill"></circle>
            <circle r="35" cx="643" cy="536" class="animate-ping origin-[50%_50%] transform-box-fill"></circle>
            <circle r="52" cx="782" cy="118" class="animate-bounce origin-[50%_50%] transform-box-fill"></circle>
            <circle r="62" cx="90" cy="531" class="animate-spin-slow origin-[50%_50%] transform-box-fill"></circle>
            <circle r="59" cx="909" cy="396" class="animate-spin-slow origin-[50%_50%] transform-box-fill"></circle>
            <circle r="52" cx="10" cy="399" class="animate-pulse origin-[50%_50%] transform-box-fill"></circle>
            <circle r="58" cx="408" cy="167" class="animate-pulse origin-[50%_50%] transform-box-fill"></circle>
            <circle r="43" cx="660" cy="190" class="animate-spin-slow origin-[50%_50%] transform-box-fill"></circle>
            <circle r="31" cx="299" cy="26" class="animate-spin-slow origin-[50%_50%] transform-box-fill"></circle>
            <circle r="56" cx="931" cy="26" class="animate-bounce origin-[50%_50%] transform-box-fill"></circle>
            <circle r="43" cx="738" cy="375" class="animate-bounce origin-[50%_50%] transform-box-fill"></circle>
            <circle r="38" cx="142" cy="298" class="animate-ping origin-[50%_50%] transform-box-fill"></circle>
            <circle r="54" cx="340" cy="536" class="animate-bounce origin-[50%_50%] transform-box-fill"></circle>
            <circle r="61" cx="442" cy="13" class="animate-spin-slow origin-[50%_50%] transform-box-fill"></circle>
            <circle r="55" cx="2" cy="247" class="animate-ping origin-[50%_50%] transform-box-fill"></circle>
        </g>
      </svg>
    </main>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

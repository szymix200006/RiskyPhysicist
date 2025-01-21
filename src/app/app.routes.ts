import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { MenuComponent } from '../pages/menu/menu.component';
import { GameComponent } from '../pages/game/game.component';
import { EndingScreenComponent } from '../pages/ending-screen/ending-screen.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent, title: 'Home'},
    {path: 'menu', component: MenuComponent, title: 'Menu'},
    {path: 'game', component: GameComponent, title: 'Game'},
    {path: 'ending', component: EndingScreenComponent, title: 'Ending'},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent, title: '404'}
];

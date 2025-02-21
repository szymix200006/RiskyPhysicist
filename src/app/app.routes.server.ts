import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'home',
    renderMode: RenderMode.Server
  },
  {
    path: 'menu',
    renderMode: RenderMode.Server
  },
  {
    path: 'game',
    renderMode: RenderMode.Client
  },
  {
    path: 'ending',
    renderMode: RenderMode.Prerender
  },
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];

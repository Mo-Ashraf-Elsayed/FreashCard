import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'productDetails/:productName/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'checkOut/:cartId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'verifyCode/:email',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];

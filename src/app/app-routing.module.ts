import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./views/home-view/home-view.module').then(m => m.HomeViewModule)
      },
      {
        path: 'note/:id',
        loadChildren: () => import('./core/components/cards/cards.module').then(m => m.CardsModule)
      },
      {
        path: 'deleted',
        loadChildren: () => import('./views/deleted-view/deleted-view.module').then(m => m.DeletedViewModule)
      },
      {
        path: 'favorite',
        loadChildren: () => import('./views/favorite-view/favorite-view.module').then(m => m.FavoriteViewModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

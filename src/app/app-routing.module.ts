import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'itineraire', loadChildren: './itineraire/itineraire.module#ItinerairePageModule' },
  { path: 'around-me', loadChildren: './around-me/around-me.module#AroundMePageModule' },
  { path: 'horaire', loadChildren: './horaire/horaire.module#HorairePageModule' },
  {
    path: 'tab2',
    loadChildren: './tab2/tab2.module#Tab2PageModule'
  },
  {
    path: '',
    redirectTo: 'itineraire',
    pathMatch: 'full'
  },
  { path: 'favorites', loadChildren: './favorites/favorites.module#FavoritesPageModule' },
  { path: 'horaire2' , loadChildren: './horaire2/horaire2.module#Horaire2PageModule' }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

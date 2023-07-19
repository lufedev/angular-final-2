import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeListComponent } from './anime-list/anime-list.component';
import { AnimeDetailsComponent } from './anime-details/anime-details.component';


const routes: Routes = [
  { path: '', redirectTo: 'anime-list', pathMatch: 'full' },
  { path: 'anime-list', component: AnimeListComponent },
  { path: 'anime-details/:slug', component: AnimeDetailsComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

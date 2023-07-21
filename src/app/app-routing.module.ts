import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeListComponent } from './anime-list/anime-list.component';
import { AnimeDetailsComponent } from './anime-details/anime-details.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { AnimeSearchComponent } from './anime-search/anime-search.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: '', redirectTo: 'anime-list', pathMatch: 'full' },
  { path: 'anime-list', component: AnimeListComponent },
  { path: 'anime-details/:slug', component: AnimeDetailsComponent },
  { path: 'search/:text', component: AnimeSearchComponent },
  { path: 'auth', component: LoginComponent},
  { path: 'profile', component: ProfileComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

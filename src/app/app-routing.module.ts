import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { ListSuggestionComponent } from './features/suggestions/list-suggestion/list-suggestion.component';
import { NotfoundComponent } from './core/notfound/notfound.component';

const routes: Routes = [
   { path: '', redirectTo: '/home', pathMatch: 'full' },  // default
  { path: 'home', component: HomeComponent },
  { path: 'listSuggestion', component: ListSuggestionComponent },

  // Lazy modules (will be added later)
  {
    path: 'suggestions',
    loadChildren: () =>
      import('./features/suggestions/suggestions.module').then(m => m.SuggestionsModule)
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./features/users/users.module').then(m => m.UsersModule)
  },
   { path: 'suggestions', loadChildren: () => import('./features/suggestions/suggestions.module').then(m => m.SuggestionsModule) },
   { path: 'users', loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule) },

  { path: '**', component: NotfoundComponent } // wildcard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

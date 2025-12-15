import { Component } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../services/suggestion.service';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrl: './list-suggestion.component.css'
})
export class ListSuggestionComponent {
 searchText: string = '';
  searchCategory: string = '';

  favorites: Suggestion[] = [];

 suggestions: Suggestion[] = [];

  constructor(private ss: SuggestionService) {}
  ngOnInit(): void {
    
  this.ss.getSuggestions().subscribe(data => {
    console.log('data',data);
    
  this.suggestions = data;
});
  }

  likeSuggestion(s: Suggestion) {
    s.likes!++;
  }

  addToFavorites(s: Suggestion) {
    if (!this.favorites.includes(s)) {
      this.favorites.push(s);
    }
  }

  get filteredSuggestions(): Suggestion[] {
    return this.suggestions.filter(s =>
      s.title.toLowerCase().includes(this.searchText.toLowerCase()) &&
      s.category.toLowerCase().includes(this.searchCategory.toLowerCase())
    );
  }
}

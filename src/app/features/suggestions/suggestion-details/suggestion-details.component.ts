import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../services/suggestion.service';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrl: './suggestion-details.component.css'
})
export class SuggestionDetailsComponent  {

  id!: number;
  suggestion!: Suggestion;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = Number(params['id']);
      this.loadSuggestion();
    });
  }

  loadSuggestion(): void {
    const result = this.suggestionService.getSuggestionById(this.id);
    if (result) {
      this.suggestion = result;
    } else {
      // sécurité si l'id n'existe pas
      this.router.navigate(['/suggestions']);
    }
  }

  goBack(): void {
    this.router.navigate(['/suggestions']);
  }
}

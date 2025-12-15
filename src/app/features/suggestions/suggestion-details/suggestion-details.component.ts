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
    let id = Number(params['id']);
    this.suggestionService.getSuggestionById(id).subscribe(data => {
      if (data) {
        this.suggestion = data.suggestion;
        console.log( "dataaaaaaaaaaaaaaaaaaaaaaa",this.suggestion);
        
      } else {
        this.router.navigate(['/suggestions']);
      }
    });
  });
}


  goBack(): void {
    this.router.navigate(['/suggestions']);
  }

 deleteSuggestion(id: number): void {
  if (confirm('Voulez-vous vraiment supprimer cette suggestion ?')) {
    this.suggestionService.deleteSuggestion(id).subscribe(() => {
      alert('Suggestion supprimée avec succès !');
      this.router.navigate(['/suggestions']);
    });
  }
}

}

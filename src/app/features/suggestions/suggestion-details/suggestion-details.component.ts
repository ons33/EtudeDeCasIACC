import { Component } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrl: './suggestion-details.component.css'
})
export class SuggestionDetailsComponent {

id!: number;
  suggestion!: Suggestion;

  suggestions: Suggestion[] = [
    { id: 1, title: 'Team building', description: '...', category: 'Event', date: new Date(), status: 'acceptee' },
    { id: 2, title: 'UI Modernisation', description: '...', category: 'Tech', date: new Date(), status: 'en_attente' },
    { id: 3, title: 'Formation Sécurité', description: '...', category: 'Formation', date: new Date(), status: 'acceptee' }
  ];

  constructor(private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
 this.route.params.subscribe(params => {
      this.id = Number(params['id']);
    });
    this.suggestion = this.suggestions.find(s => s.id === this.id)!;
  }

  goBack() {
    this.router.navigate(['/suggestions']);
  }
  
}

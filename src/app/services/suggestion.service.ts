import { Injectable } from '@angular/core';
import { Suggestion } from '../models/suggestion';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  
  suggestions: Suggestion[] = [{
      id: 1,
      title: 'Organiser une journée team building',
      description: 'Suggestion pour organiser une journée de team building.',
      category: 'Événements',
      date: new Date('2025-01-20'),
      status: 'acceptee',
      likes: 0
    },
    {
      id: 2,
      title: 'Améliorer le système de réservation',
      description: 'Proposition pour améliorer les réservations en ligne.',
      category: 'Technologie',
      date: new Date('2025-01-15'),
      status: 'refusee',
      likes: 0
    },
    {
      id: 3,
      title: 'Créer un système de récompenses',
      description: 'Programme de récompenses pour motiver les employés.',
      category: 'Ressources Humaines',
      date: new Date('2025-01-25'),
      status: 'refusee',
      likes: 0
    },
    {
      id: 4,
      title: 'Moderniser l’interface utilisateur',
      description: 'Refonte complète de l’UI.',
      category: 'Technologie',
      date: new Date('2025-01-30'),
      status: 'en_attente',
      likes: 0
    },
    {
      id: 5,
      title: 'Formation en sécurité informatique',
      description: 'Formation sur les bonnes pratiques de sécurité.',
      category: 'Formation',
      date: new Date('2025-02-05'),
      status: 'acceptee',
      likes: 0
    } ];
  private nextId = this.suggestions.length + 1;

  getSuggestions(): Suggestion[] {
    return this.suggestions;
  }
    getSuggestionById(id: number): Suggestion | undefined {
    return this.suggestions.find(s => s.id === id);
  }
    addSuggestion(suggestion: Suggestion): void {
    suggestion.id = this.nextId++;
    this.suggestions.push(suggestion);
  }
}

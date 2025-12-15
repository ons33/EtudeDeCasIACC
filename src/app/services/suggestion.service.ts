import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Suggestion } from '../models/suggestion';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  private suggestionUrl = 'http://localhost:3000/suggestions';

  constructor(private http: HttpClient) {}

  addSuggestion(suggestion: Suggestion) {
    return this.http.post<Suggestion>(this.suggestionUrl, suggestion);
  }
  getSuggestions(): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(this.suggestionUrl);
  }
  getSuggestionById(id: number) {
     return this.http.get<any>(this.suggestionUrl + '/' + id );
  }
////////////////////////////// (`${this.suggestionUrl}/${id}`);
  updateSuggestion(id: number, suggestion: Suggestion) {
    return this.http.put<Suggestion>(this.suggestionUrl + '/' + id,suggestion,  );
  }
  deleteSuggestion(id: number) {
    return this.http.delete(this.suggestionUrl + '/' + id);
  }
}

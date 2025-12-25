import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuggestionService } from '../../../services/suggestion.service';

@Component({
  selector: 'app-suggestion-update',
  templateUrl: './suggestion-update.component.html',
  styleUrl: './suggestion-update.component.css'
})
export class SuggestionUpdateComponent {

  suggestionForm!: FormGroup;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private suggestionService: SuggestionService
  ) {}
categories: string[] = [
  'Infrastructure et bâtiments',
  'Technologie et services numériques',
  'Restauration et cafétéria',
  'Hygiène et environnement',
  'Transport et mobilité',
  'Activités et événements',
  'Sécurité',
  'Communication interne',
  'Accessibilité',
  'Autre'
];
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.suggestionForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      date: [''],
      status: ['']
    });

    this.suggestionService.getSuggestionById(this.id).subscribe(data => {
      this.suggestionForm.patchValue(data.suggestion);
    });
  }

  update(): void {
    this.suggestionService
      .updateSuggestion(this.id, this.suggestionForm.value)
      .subscribe(() => {
        this.router.navigate(['/suggestions']);
      });
  }
}

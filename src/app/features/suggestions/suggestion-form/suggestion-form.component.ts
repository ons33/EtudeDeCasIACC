import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../services/suggestion.service';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrl: './suggestion-form.component.css'
})
export class SuggestionFormComponent  {

  suggestionForm!: FormGroup;

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
      /* =====================================================
       MÉTHODE 1 : FormGroup + FormControl 
       ===================================================== */

    /*
    this.suggestionForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[A-Z][a-zA-Z]*$')
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(30)
      ]),
      category: new FormControl('', Validators.required),
      date: new FormControl({ value: new Date(), disabled: true }),
      status: new FormControl({ value: 'en attente', disabled: true })
    });
    */

    /* =====================================================
       MÉTHODE 2 : FormBuilder 
    ===================================================== */
    this.suggestionForm = this.fb.group({
      title: ['',[Validators.required,Validators.minLength(5),Validators.pattern('^[A-Z][a-zA-Z]*$')]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      category: ['', Validators.required],
      date: [{ value: new Date(), disabled: true }],
      status: [{ value: 'en attente', disabled: true }]
    });
  }

  get title() { return this.suggestionForm.get('title'); }
  get description() { return this.suggestionForm.get('description'); }
  get category() { return this.suggestionForm.get('category'); }

  onSubmit(): void {
    if (this.suggestionForm.invalid) return;

    // const newSuggestion: Suggestion = {
    //   id: 0, 
    //   title: this.title?.value,
    //   description: this.description?.value,
    //   category: this.category?.value,
    //   date: new Date(),
    //   status: 'en attente',
    //   likes: 0
    // };

    this.suggestionService.addSuggestion(this.suggestionForm.value).subscribe(() => {
  this.router.navigate(['/suggestions']);
});

  }
}

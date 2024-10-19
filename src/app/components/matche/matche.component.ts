import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { Equipe, Matche } from '../../Models/Tout.Model'
import { MatcheService } from '../../services/matche.service'
import { EquipeService } from '../../services/equipe.service'

@Component({
  selector: 'app-matche',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './matche.component.html',
  styleUrls: ['./matche.component.css']
})
export class MatcheComponent implements OnInit {
  matches: Matche[] = []
  equipes: Equipe[] = []
  matcheForm!: FormGroup;
  isEditing = false

  constructor (
    private readonly fb: FormBuilder,
    private readonly matcheService: MatcheService, // Marked as readonly
    private readonly equipeService: EquipeService // Marked as readonly
  ) {}

  ngOnInit (): void {
    this.initForm()
    this.loadMatches()
    this.loadEquipes()
  }

  private initForm (): void {
    this.matcheForm = this.fb.group({
      equipe_local: ['', Validators.required],
      equipe_visiteur: ['', Validators.required],
      date: ['', Validators.required],
      lieu: ['', Validators.required]
    })
  }




  loadMatches(): void {
    this.matcheService.getMatches().subscribe((matches: Matche[]) => {
      this.matches = matches;
      console.log('matches:', this.matches);
    });
  }


  loadEquipes(): void {
    this.equipeService.getEquipes().subscribe((equipes: Equipe[]) => {
      this.equipes = equipes;
      console.log('equipes:', this.equipes);
    });
  }

 
  onSubmit (): void {
    if (this.matcheForm.valid) {
      if (this.isEditing) {
        this.matcheService.updateMatche(this.matcheForm.value).subscribe(() => {
          this.loadMatches()
          this.resetForm()
        })
      } else {
        this.matcheService.addMatche(this.matcheForm.value).subscribe(() => {
          this.loadMatches()
          this.resetForm()
        })
      }
    }
  }

  
  editMatche (matche: Matche): void {
    this.isEditing = true
    this.matcheForm.patchValue(matche)
  }

  deleteMatche (matche: Matche): void {
    this.matcheService.deleteMatche(matche).subscribe(() => {
      this.loadMatches()
    })
  }

  private resetForm (): void {
    this.isEditing = false
    this.matcheForm.reset()
  }
}

import { Component, OnInit } from '@angular/core'
import { Matche } from '../../Models/Tout.Model';
import { CommonModule } from '@angular/common';
import { MatcheService } from '../../services/matche.service';
// import { NavbarComponent } from '../navbar/navbar.component'
// import { RouterModule } from '@angular/router'


@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acceuil.component.html',

  styleUrl: './acceuil.component.css'
})
export class AcceuilComponent implements OnInit {
  matches: Matche[] = [];

  constructor (
    private readonly matcheService: MatcheService, // Marked as readonly
  ) {}
  ngOnInit (): void {
    this.loadMatches()
  }




  loadMatches(): void {
    this.matcheService.getMatches().subscribe((matches: Matche[]) => {
      this.matches = matches;
      console.log('matches:', this.matches);
    });
  }

}

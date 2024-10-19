import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ResultatService } from '../../services/resulat.service';
import { filter } from 'rxjs/operators';
// import { Resultat } from '../../Models/Tout.Model';

// Interface Resultat corrigée pour inclure les propriétés manquantes
export interface Resultat {
  id: number;
  matche_id: number;
  equipe_local: string;
  equipe_visiteur: string;
  logo_local: string; // Correction pour logo local
  logo_visiteur: string; // Correction pour logo visiteur
  score_local: number;
  score_visiteur: number;
  carton_jaune: number;
  carton_rouge: number;
  detail_but: object;
  showDetails?: boolean; // Ajout de la propriété optionnelle
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-resultats',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.css']
})
export class ResultatsComponent implements OnInit {
  resultats$!: Observable<Resultat[]>;
  selectedResultat: Resultat | null = null;

  constructor(private readonly resultatService: ResultatService) {}

  ngOnInit(): void {
    // this.getResultats();
  }

  // getResultats(): void {
  //   // this.resultats$ = this.resultatService.getResultats();
  //   this.resultats$ = this.resultatService.getResultats().pipe(
  //     // Ajout d'un newResultat pour ne récupérer que les résultats d'une competition spécifique
  //     filter((Resultat) => Resultat.match_id === 1)
  //   );
  // }
  // getResultats(): void {
  //   this.resultats$ = this.resultatService.getResultats();
  //   // Ajout d'un filtre pour ne récupérer que les résultats d'une competition spécifique
  //   this.resultats$ = this.resultats$.pipe(
  //     filter((resultat) => resultat.match_id === 1)
  //   );
  // }

  // createResultat(): void {
  //   const newResultat: Resultat = {
  //     id: 0, // ID initial, remplacé par le serveur
  //     match_id: 1, // Remplacez par les données réelles
  //     equipe_local: 'Équipe A',
  //     equipe_visiteur: 'Équipe B',
  //     logo_local: 'path/to/logo-local.png', // Exemple d'URL de logo
  //     logo_visiteur: 'path/to/logo-visiteur.png', // Exemple d'URL de logo
  //     score_local: 0,
  //     score_visiteur: 0,
  //     carton_jaune: 0,
  //     carton_rouge: 0,
  //     detail_but: {},
  //     showDetails: false // Optionnel
  //   };

  //   this.resultatService.addResultat(newResultat).subscribe(() => {
  //     this.getResultats(); // Rafraîchir la liste
  //   });
  // }

  toggleDetails(resultat: Resultat): void {
    resultat.showDetails = !resultat.showDetails; // Basculez la visibilité des détails
  }

  clearSelection(): void {
    this.selectedResultat = null;
  }
}

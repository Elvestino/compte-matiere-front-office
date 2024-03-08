import { Component } from '@angular/core';

import { AddOrdreComponent } from './components/add-ordre/add-ordre.component';
import { AddfournisseurComponent } from './components/addfournisseur/addfournisseur.component';

@Component({
  selector: 'app-fournisseur',
  standalone: true,
  imports: [AddfournisseurComponent, AddOrdreComponent],
  templateUrl: './fournisseur.component.html',
  styleUrl: './fournisseur.component.scss',
})
export class FournisseurComponent {
  isFournisseurComponentOpen: boolean = false;

  isOrdreComponentOpen: boolean = false;
  toggleOpenAddFournisseur() {
    this.isFournisseurComponentOpen = !this.isFournisseurComponentOpen;
  }
  toggleOpenAddOrdre() {
    this.isOrdreComponentOpen = !this.isOrdreComponentOpen;
  }
}

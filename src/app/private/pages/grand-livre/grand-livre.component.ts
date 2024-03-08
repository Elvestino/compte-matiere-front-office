import { Component } from '@angular/core';
import { AddAnneeComponent } from '../../components/add-annee/add-annee.component';

@Component({
  selector: 'app-grand-livre',
  standalone: true,
  imports: [AddAnneeComponent],
  templateUrl: './grand-livre.component.html',
  styleUrl: './grand-livre.component.scss',
})
export class GrandLivreComponent {
  Annee: boolean = false;
  OpenAddForm() {
    this.Annee = !this.Annee;
  }
}

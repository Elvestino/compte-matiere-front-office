import { Component } from '@angular/core';
import { AddAnneeComponent } from '../../components/add-annee/add-annee.component';

@Component({
  selector: 'app-journal',
  standalone: true,
  imports: [AddAnneeComponent],
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.scss',
})
export class JournalComponent {
  year: boolean = false;
  OpenAddForm() {
    this.year = !this.year;
  }
}

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-annee',
  standalone: true,
  imports: [],
  templateUrl: './add-annee.component.html',
  styleUrl: './add-annee.component.scss',
})
export class AddAnneeComponent {
  @Output() open = new EventEmitter();
  closeAdd(): void {
    this.open.emit();
  }
}

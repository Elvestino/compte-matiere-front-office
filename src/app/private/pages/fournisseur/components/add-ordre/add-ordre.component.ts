import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-ordre',
  standalone: true,
  imports: [],
  templateUrl: './add-ordre.component.html',
  styleUrl: './add-ordre.component.scss',
})
export class AddOrdreComponent {
  @Output() close = new EventEmitter();
  closeForm(): void {
    this.close.emit();
  }
  title: string[] = ['Enregistrement Ordre'];
}

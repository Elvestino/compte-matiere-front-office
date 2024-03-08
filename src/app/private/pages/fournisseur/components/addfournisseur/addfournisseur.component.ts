import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-addfournisseur',
  standalone: true,
  imports: [],
  templateUrl: './addfournisseur.component.html',
  styleUrl: './addfournisseur.component.scss',
})
export class AddfournisseurComponent {
  @Output() close = new EventEmitter();
  closeForm(): void {
    this.close.emit();
  }
  title: string[] = ['Enregistrement Fournisseur'];
}

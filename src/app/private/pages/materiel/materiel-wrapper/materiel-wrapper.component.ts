import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterielComponent } from '../materiel.component';

@Component({
  selector: 'app-materiel-wrapper',
  standalone: true,
  imports: [RouterOutlet, MaterielComponent],
  templateUrl: './materiel-wrapper.component.html',
  styleUrl: './materiel-wrapper.component.scss',
})
export class MaterielWrapperComponent {}

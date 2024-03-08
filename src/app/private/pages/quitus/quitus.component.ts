import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quitus',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './quitus.component.html',
  styleUrl: './quitus.component.scss',
})
export class QuitusComponent {
  add = 'Enregistrement Quitus';
}

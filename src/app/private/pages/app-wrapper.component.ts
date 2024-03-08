import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Component({
  selector: 'app-app-wrapper',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app-wrapper.component.html',
  styleUrl: './app-wrapper.component.scss',
})
export class AppWrapperComponent {}

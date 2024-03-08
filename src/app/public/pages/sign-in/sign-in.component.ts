import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  password: string = '';
  showPassword: boolean = false;

  PassordVisible() {
    this.showPassword = !this.showPassword;
  }
}

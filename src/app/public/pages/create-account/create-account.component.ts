import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [RouterLink, HttpClientModule, ReactiveFormsModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
})
export class CreateAccountComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  optionValue: string[] = [
    'Stagiaire',
    'Directeur ',
    'Vice-President',
    'President',
    "Chef d'equipe",
    'Membre',
  ];
  loginForm = new FormGroup({
    immatricule: new FormControl('', [
      Validators.required,
      Validators.maxLength(6),
    ]),
    nomComplet: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    grade: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(15),
    ]),
    confirmpassword: new FormControl('', [
      Validators.required,
      Validators.maxLength(15),
    ]),
  });
  get immatricule() {
    return this.loginForm.get('immatricule');
  }
  get nomComplet() {
    return this.loginForm.get('nomComplet');
  }
  get password() {
    return this.loginForm.get('password');
  }
  get confirmpassword() {
    return this.loginForm.get('confirmpassword');
  }

  isSubmitting: boolean = false;
  isRegisterSuccess: boolean = false;
  showPassword: boolean = false;

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  submitData() {
    this.isSubmitting = true;
    console.log('Form value: ', this.loginForm.value);
    this.authService.register(this.loginForm.value).subscribe({
      next: (success) => {
        localStorage.setItem('user-create', success.immatricule);
        this.isSubmitting = false;
        this.isRegisterSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);
      },
      error: () => {
        console.log('immatricule deja entree');
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Immatricule deja enregistree',
          showConfirmButton: false,
          timer: 1500,
        });

        this.isSubmitting = false;
      },
    });
  }
}

import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { JwtDecodeService } from '../../../shared/services/jwt-code.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private jwtDecodeService: JwtDecodeService,
  ) {}

  loginForm = new FormGroup({
    immatricule: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  get immatricule() {
    return this.loginForm.get('immatricule');
  }
  get password() {
    return this.loginForm.get('password');
  }
  showPassword: boolean = false;
  isSubmitting: boolean = false;
  isLoginSuccess: boolean = false;

  PassordVisible() {
    this.showPassword = !this.showPassword;
  }
  Submit() {
    this.isSubmitting = true;
    const { immatricule, password } = this.loginForm.value as {
      immatricule: string;
      password: string;
    };
    this.authService.login({ immatricule, password }).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.isLoginSuccess = true;

        const data = this.jwtDecodeService.decodeToken(res.access_token);
        console.log(data);

        localStorage.setItem('access_token', res.access_token);
        this.router.navigate(['/apps']);
      },
      error: () => {
        this.isSubmitting = false;
        console.log('immatricule ou mot de passe incorrect');
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Immatricule ou mot de passe incorrect',
          showConfirmButton: false,
          timer: 1500,
        });
      },
    });
  }
  ngOnAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}

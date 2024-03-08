import { APINestService } from './../../../services/api/api-nest.service';
import { UsersModel } from './../../../models/users/users.model';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [RouterLink, HttpClientModule, ReactiveFormsModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
})
export class CreateAccountComponent {
  @Output() formsubmitted = new EventEmitter<UsersModel>();
  Formulaire: FormGroup;
  constructor(
    private fb: FormBuilder,
    private APINestService: APINestService,
  ) {
    this.Formulaire = this.fb.group({
      immatricule: [null, Validators.required],
      nomComplet: ['', Validators.required],
      grade: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.Formulaire.valid) {
      const formData: UsersModel = this.Formulaire.value;
      this.APINestService.create(formData).subscribe(() => {
        this.formsubmitted.emit(formData);
        this.Formulaire.reset();
      });
    }
  }
}

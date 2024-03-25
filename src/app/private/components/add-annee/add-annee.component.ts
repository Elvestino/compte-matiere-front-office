import { Component, EventEmitter, Output } from '@angular/core';
import { AnneeService } from '../../service/annee.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-annee',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-annee.component.html',
  styleUrl: './add-annee.component.scss',
})
export class AddAnneeComponent {
  constructor(private annee: AnneeService, private formBuilder: FormBuilder) {}
  @Output() open = new EventEmitter();
  closeAdd(): void {
    this.open.emit();
  }

  AnneeForm = this.formBuilder.group({
    newannee: ['', [Validators.required]],
  });
  get newannee() {
    return this.AnneeForm.get('newannee');
  }
  submitAnnee() {
    this.annee.create(this.AnneeForm.value).subscribe({
      next: () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Nouvelle annee enregistre',
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          this.closeAdd();
        }, 1000);
      },
      error: () => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Annee deja enregistree',
          showConfirmButton: false,
          timer: 1500,
        });
      },
    });
  }
}

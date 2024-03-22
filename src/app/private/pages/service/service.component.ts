import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ServiceService } from '../../service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, FormsModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss',
})
export class ServiceComponent {
  constructor(
    private service: ServiceService,
    private formBuilder: FormBuilder
  ) {
    this.getData();
  }

  data: any[] = [];
  serviceForm = this.formBuilder.group({
    numService: ['', [Validators.required]],
    nomService: ['', [Validators.required]],
    libelle: ['', [Validators.required]],
    SOA: ['', [Validators.required]],
    typeService: ['', [Validators.required]],
  });
  isSubmitting: boolean = false;
  isRegisterSuccess: boolean = false;

  clear() {
    this.serviceForm = this.formBuilder.group({
      numService: '',
      nomService: '',
      libelle: '',
      SOA: '',
      typeService: '',
    });
  }

  getData() {
    this.service.findAll().subscribe((getAll) => {
      this.data = getAll;
    });
  }

  submitservice() {
    this.isSubmitting = true;
    this.service.create(this.serviceForm.value).subscribe({
      next: () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'service enregistre',
          showConfirmButton: false,
          timer: 1500,
        });
        this.isSubmitting = false;
        this.isRegisterSuccess = true;
        setTimeout(() => {
          this.getData();
          this.clear();
        }, 1000);
      },
      error: () => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'service deja enregistree',
          showConfirmButton: false,
          timer: 1500,
        });

        this.isSubmitting = false;
      },
    });
  }

  modif(item: any) {
    console.log('form value', item);
    this.getData();
    this.clear();

    this.service.update(this.getData);
  }

  delete(numService: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Voulez-vous vraiment supprimer le service ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OUI!!, Supprimer',
        cancelButtonText: 'NON!!, Ne pas Supprimer',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: 'Supprimer',
            text: 'Service supprimer avec success',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
          this.service.remove(numService).subscribe({
            next: () => {
              this.getData();
              this.clear();
            },
            error: (error) => {
              console.error(error);
            },
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Annuler',
            text: 'Suppression du service annuler',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ServiceService } from '../../service/service.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { PrintServiceComponent } from './components/print-service/print-service.component';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    PrintServiceComponent,
    RouterLink,
  ],
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent {
  constructor(
    private service: ServiceService,
    private formBuilder: FormBuilder
  ) {
    this.getService();
  }
  data: any[] = [];
  openSubmit: boolean = false;
  isSubmitting: boolean = false;
  isRegisterSuccess: boolean = false;
  PrintComponent: boolean = false;

  serviceForm = this.formBuilder.group({
    numService: [''],
    nomService: ['', [Validators.required]],
    libelle: ['', [Validators.required]],
    SOA: ['', [Validators.required]],
    typeService: ['', [Validators.required]],
  });

  getService() {
    this.service.findAll().subscribe(
      (res) => {
        this.data = res;
      },
      (err) => {
        console.error(err);
      }
    );
  }
  clear() {
    this.serviceForm = this.formBuilder.group({
      numService: '',
      nomService: '',
      libelle: '',
      SOA: '',
      typeService: '',
    });
  }
  openPrint() {
    this.PrintComponent = !this.PrintComponent;
  }

  submitservice() {
    if (this.openSubmit) {
      this.submitModif();
      this.clear();
    } else {
      this.isSubmitting = true;
      this.service.create(this.serviceForm.value).subscribe({
        next: (result) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'service enregistre',
            showConfirmButton: false,
            timer: 1500,
          }).then((res) => {
            console.log('Service créé avec succès:', res);
            this.isSubmitting = false;
            this.isRegisterSuccess = false;
            this.clear();
            this.getService();
          });
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
  }

  modif(item: any) {
    this.openSubmit = true;

    if (this.serviceForm) {
      this.serviceForm.patchValue({
        numService: item.numService,
        nomService: item.nomService,
        libelle: item.libelle,
        SOA: item.SOA,
        typeService: item.typeService,
      });

      this.isRegisterSuccess = false;
    }
  }

  submitModif() {
    this.isSubmitting = true;
    this.service.update(this.serviceForm.value).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.openSubmit = false;
        this.data = res;
        console.log(res);
      },
      error: (error) => {
        console.error(error);
      },
    });
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
        confirmButtonText: 'Supprimer',
        cancelButtonText: 'Annuler',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.service.remove(numService).subscribe({
            next: (res) => {
              this.clear();
              swalWithBootstrapButtons.fire({
                title: 'Supprimer',
                text: 'Service supprimer avec success',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
              });
            },
            error: (error) => {
              console.error(error);
              swalWithBootstrapButtons.fire({
                title: 'erreur',
                text: 'Erreur lors de la suppression du service',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500,
              });
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

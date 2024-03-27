import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ServiceService } from '../../service/service.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { QuitusService } from '../../service/quitus.service';
import { PrintQuitusComponent } from './components/print-quitus/print-quitus.component';

@Component({
  selector: 'app-quitus',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, PrintQuitusComponent],
  templateUrl: './quitus.component.html',
  styleUrl: './quitus.component.scss',
})
export class QuitusComponent {
  constructor(
    private QuitusS: QuitusService,
    private service: ServiceService,
    private formBuilder: FormBuilder
  ) {
    this.getService();
    this.getQuitus();
  }
  add = 'Enregistrement Quitus';
  formHeader = 'Confirmer';

  servicedata: any[] = [];
  quitusdata: any[] = [];
  PrintComponent: boolean = false;
  isSubmitting: boolean = false;
  isRegisterSuccess: boolean = false;

  QuitusForm = this.formBuilder.group({
    numQuitus: ['', [Validators.required]],
    dateQuitus: ['', [Validators.required]],
    numService: ['', [Validators.required]],
    observateur: ['', [Validators.required]],
    ReferenceQuitus: ['', [Validators.required]],
    objetQuitus: ['', [Validators.required]],
    montantQuitus: ['', [Validators.required]],
    exerciceAnnee: ['', [Validators.required]],
  });

  clear() {
    this.QuitusForm = this.formBuilder.group({
      numQuitus: '',
      dateQuitus: '',
      numService: '',
      observateur: '',
      ReferenceQuitus: '',
      montantQuitus: '',
      exerciceAnnee: '',
      objetQuitus: '',
    });
  }
  getQuitus() {
    this.QuitusS.findAll().subscribe((getAll) => {
      this.quitusdata = getAll;
    });
  }

  openPrint() {
    this.PrintComponent = !this.PrintComponent;
    this.getQuitus();
  }
  getService() {
    this.service.findAll().subscribe((getAll) => {
      this.servicedata = getAll;
    });
  }
  AddQuitus() {
    this.isSubmitting = true;
    console.log(this.QuitusForm.value.numService);
    this.QuitusS.create(this.QuitusForm.value).subscribe({
      next: () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Quitus enregistre',
          showConfirmButton: false,
          timer: 1500,
        });
        this.isSubmitting = false;
        this.isRegisterSuccess = false;
        setTimeout(() => {
          this.getQuitus();
          this.clear();
        }, 1000);
      },
      error: () => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Quitus deja enregistree',
          showConfirmButton: false,
          timer: 1500,
        });
        this.isSubmitting = false;
      },
    });
  }

  modifAquitus(item: any) {
    if (this.QuitusForm) {
      this.QuitusForm.patchValue({
        numQuitus: item.numQuitus,
        dateQuitus: item.dateQuitus,
        numService: item.service.numService,
        observateur: item.observateur,
        ReferenceQuitus: item.ReferenceQuitus,
        montantQuitus: item.montantQuitus,
        exerciceAnnee: item.exerciceAnnee,
        objetQuitus: item.objetQuitus,
      });
      this.formHeader = 'Modifier';

      this.isRegisterSuccess = false;
      this.QuitusS.update(this.QuitusForm.value);
    }
  }

  deleteQuitus(numQuitus: number) {
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
            text: 'Quitus supprimer avec success',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
          this.QuitusS.remove(numQuitus).subscribe({
            next: () => {
              this.getQuitus();
              this.clear();
            },
            error: (error) => {
              console.error(error);
            },
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Annuler',
            text: 'Suppression du quitus annuler',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }

  getTotalCount(): number {
    return this.quitusdata.length;
  }
}

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ServiceService } from '../../service/service.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { QuitusService } from '../../service/quitus.service';
import { PrintQuitusComponent } from './components/print-quitus/print-quitus.component';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-quitus',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, PrintQuitusComponent],
  templateUrl: './quitus.component.html',
  styleUrl: './quitus.component.scss',
})
export class QuitusComponent implements OnInit {
  constructor(
    private QuitusS: QuitusService,
    private service: ServiceService,
    private formBuilder: FormBuilder
  ) {
    this.getQuitus();
    this.getService();
  }
  add = 'Enregistrement Quitus';
  formHeader = 'Confirmer';

  openmodal: boolean = false;
  openModif: boolean = false;
  servicedata: any[] = [];
  quitusdata: any[] = [];
  search = new FormControl();
  PrintComponent: boolean = false;
  isSubmitting: boolean = false;
  isRegisterSuccess: boolean = false;

  QuitusForm = this.formBuilder.group({
    numQuitus: [''],
    dateQuitus: ['', [Validators.required]],
    nomService: ['', [Validators.required]],
    observateur: ['', [Validators.required]],
    ReferenceQuitus: ['', [Validators.required]],
    objetQuitus: ['', [Validators.required]],
    montantQuitus: ['', [Validators.required]],
    exerciceAnnee: ['', [Validators.required]],
  });

  closeModal() {
    this.openmodal = false;
    this.openModif = false;
    this.isSubmitting = false;
    this.isRegisterSuccess = false;
    this.getQuitus();
  }
  ajoutquitus() {
    this.openmodal = true;
    this.clear();
  }
  clear() {
    this.QuitusForm = this.formBuilder.group({
      numQuitus: '',
      dateQuitus: '',
      nomService: '',
      observateur: '',
      ReferenceQuitus: '',
      montantQuitus: '',
      exerciceAnnee: '',
      objetQuitus: '',
    });
  }
  getQuitus() {
    this.QuitusS.findAll().subscribe(
      (res) => {
        this.quitusdata = res;
      },
      (err) => {
        console.error(err);
      }
    );
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

  ngOnInit(): void {
    this.getQuitus();
    this.getService();

    this.search.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchterm) => this.QuitusS.filterquitus(searchterm))
      )
      .subscribe((filteredItems) => {
        this.quitusdata = filteredItems;
      });
  }

  AddQuitus() {
    if (this.openModif) {
      this.submitModif();
    } else {
      this.isSubmitting = true;
      this.QuitusS.create(this.QuitusForm.value).subscribe({
        next: () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Quitus enregistre',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.getQuitus();
            this.clear();
            this.closeModal();
          });
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
  }

  modifAquitus(item: any) {
    this.openModif = true;
    this.openmodal = true;
    if (this.QuitusForm) {
      this.QuitusForm.patchValue({
        numQuitus: item.numQuitus,
        dateQuitus: item.dateQuitus,
        nomService: item.service.nomService,
        observateur: item.observateur,
        ReferenceQuitus: item.ReferenceQuitus,
        montantQuitus: item.montantQuitus,
        exerciceAnnee: item.exerciceAnnee,
        objetQuitus: item.objetQuitus,
      });

      this.formHeader = 'Modifier';
      this.add = 'Modifier Quitus';
      this.isRegisterSuccess = false;
    }
  }

  submitModif() {
    this.isSubmitting = true;
    this.QuitusS.update(this.QuitusForm.value).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        console.log(res);
        this.closeModal();
        this.getQuitus();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  deleteQuitus(numQuitus: string) {
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

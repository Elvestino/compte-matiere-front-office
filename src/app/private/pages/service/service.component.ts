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
import { BehaviorSubject, Subject, switchMap, takeUntil } from 'rxjs';

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
  styleUrl: './service.component.scss',
})
export class ServiceComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly refresh$: BehaviorSubject<undefined> =
    new BehaviorSubject<undefined>(undefined);

  constructor(
    private service: ServiceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.refresh$
      .pipe(
        switchMap(() => {
          return this.service.findAll();
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: (res) => {
          this.data = res;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  refresh() {
    this.refresh$.next(undefined);
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
    this.refresh();
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
            this.refresh();
            this.isSubmitting = false;
            this.isRegisterSuccess = false;
            this.clear();
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
        this.refresh();
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
              this.refresh();
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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

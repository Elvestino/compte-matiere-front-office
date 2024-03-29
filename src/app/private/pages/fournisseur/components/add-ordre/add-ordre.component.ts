import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrdreService } from '../../../../service/ordre.service';
import { RouterLink } from '@angular/router';
import { ServiceService } from '../../../../service/service.service';
import { AnneeService } from '../../../../service/annee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-ordre',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './add-ordre.component.html',
  styleUrl: './add-ordre.component.scss',
})
export class AddOrdreComponent implements OnInit {
  constructor(
    private ordreService: OrdreService,
    private service: ServiceService,
    private annee: AnneeService,
    private formBuilder: FormBuilder
  ) {
    this.getService();
    this.getAnnee();
  }

  @Output() close = new EventEmitter();
  closeForm(): void {
    this.close.emit();
  }
  servicedata: any[] = [];
  AnnneeData: any[] = [];
  formHeader = 'Ajouter';
  title: string[] = ['Enregistrement Ordre'];
  isSubmitting: boolean = false;
  isRegisterSuccess: boolean = false;

  OrdreForm = this.formBuilder.group({
    numOrdre: ['', [Validators.required]],
    dateOrdre: ['', [Validators.required]],
    numService: ['', [Validators.required]],
    newannee: ['', [Validators.required]],
  });

  get numOrdre() {
    return this.OrdreForm.get('numOrdre');
  }

  getService() {
    this.service.findAll().subscribe((getAll) => {
      this.servicedata = getAll;
    });
  }
  getAnnee() {
    this.annee.findAll().subscribe((getAllAnnee) => {
      this.AnnneeData = getAllAnnee;
    });
  }
  AddOrdre() {
    this.isSubmitting = true;

    this.ordreService.create(this.OrdreForm.value).subscribe({
      next: () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Ordre enregistre',
          showConfirmButton: false,
          timer: 1500,
        });

        this.isSubmitting = false;
        this.isRegisterSuccess = false;
        setTimeout(() => {
          this.closeForm();
        }, 1000);
      },
      error: () => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'ordre deja enregistree',
          showConfirmButton: false,
          timer: 1500,
        });

        this.isSubmitting = false;
      },
    });
  }
  @Input() OrdreData: any = new EventEmitter();

  ngOnInit() {
    if (this.OrdreData) {
      this.OrdreForm.patchValue({
        numOrdre: this.OrdreData.numOrdre,
        dateOrdre: this.OrdreData.dateOrdre,
        numService: this.OrdreData.service.numService,
        newannee: this.OrdreData.annee.newannee,
      });
    }
  }
}

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
  ) {}

  @Output() close = new EventEmitter();
  closeForm(): void {
    this.close.emit();
  }
  servicedata: any[] = [];
  AnnneeData: any[] = [];
  formHeader = 'Ajouter';
  title: string[] = ['Enregistrement Ordre'];
  isSubmitting: boolean = false;
  openSubmit: boolean = false;
  isRegisterSuccess: boolean = false;

  OrdreForm = this.formBuilder.group({
    numOrdre: ['', [Validators.required]],
    dateOrdre: ['', [Validators.required]],
    nomService: ['', [Validators.required]],
    newannee: ['', [Validators.required]],
  });

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
    if (this.openSubmit) {
      this.modifSubmit();
      this.closeForm();
    } else {
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
  }
  @Input() OrdreData: any = new EventEmitter();

  ngOnInit(): void {
    this.getService();
    this.getAnnee();
    this.openSubmit = true;
    if (this.OrdreData) {
      this.OrdreForm.patchValue({
        numOrdre: this.OrdreData.numOrdre,
        dateOrdre: this.OrdreData.dateOrdre,
        nomService: this.OrdreData.service.nomService,
        newannee: this.OrdreData.annee.newannee,
      });
    }
  }
  modifSubmit() {
    this.isSubmitting = true;
    this.ordreService.update(this.OrdreForm.value).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.openSubmit = false;
        console.log(res);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}

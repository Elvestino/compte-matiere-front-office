import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PrivateServiceService } from '../../../../service/fournisseur.service';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-addfournisseur',
  standalone: true,
  imports: [RouterLink, HttpClientModule, ReactiveFormsModule],
  templateUrl: './addfournisseur.component.html',
  styleUrl: './addfournisseur.component.scss',
})
export class AddfournisseurComponent implements OnInit {
  constructor(
    private PrivateService: PrivateServiceService,
    private formBuilder: FormBuilder
  ) {}

  @Output() close = new EventEmitter();
  closeForm(): void {
    this.close.emit();
  }

  title: string[] = ['Enregistrement Fournisseur'];

  FournisseurForm = this.formBuilder.group({
    numFrns: ['', [Validators.required]],
    nomFrns: ['', [Validators.required]],
    prenomFrns: ['', [Validators.required]],
    adrsFrns: ['', [Validators.required]],
    telFrns: ['', [Validators.required]],
    typeFrns: ['', [Validators.required]],
  });

  get numFrns() {
    return this.FournisseurForm.get('numFrns');
  }
  get nomFrns() {
    return this.FournisseurForm.get('nomFrns');
  }
  get prenomFrns() {
    return this.FournisseurForm.get('prenomFrns');
  }
  get adrsFrns() {
    return this.FournisseurForm.get('adrsFrns');
  }
  get telFrns() {
    return this.FournisseurForm.get('telFrns');
  }
  get typeFrns() {
    return this.FournisseurForm.get('typeFrns');
  }

  isSubmitting: boolean = false;
  isRegisterSuccess: boolean = false;
  submitFournisseur() {
    this.isSubmitting = true;
    this.PrivateService.create(this.FournisseurForm.value).subscribe({
      next: () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Fournisseur enregistre',
          showConfirmButton: false,
          timer: 1500,
        });
        this.isSubmitting = false;
        this.isRegisterSuccess = true;
        setTimeout(() => {
          this.closeForm();
        }, 1000);
      },
      error: () => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Fournisseur deja enregistree',
          showConfirmButton: false,
          timer: 1500,
        });

        this.isSubmitting = false;
      },
    });
  }
  @Input() fournisseurData: any;

  ngOnInit() {
    console.log('Donnee :', this.fournisseurData);
    if (this.fournisseurData) {
      this.FournisseurForm.patchValue({
        numFrns: this.fournisseurData.numFrns,
        nomFrns: this.fournisseurData.nomFrns,
        prenomFrns: this.fournisseurData.prenomFrns,
        adrsFrns: this.fournisseurData.adrsFrns,
        telFrns: this.fournisseurData.telFrns,
        typeFrns: this.fournisseurData.typeFrns,
      });
      this.PrivateService.update(this.FournisseurForm.value);
    }
  }
}

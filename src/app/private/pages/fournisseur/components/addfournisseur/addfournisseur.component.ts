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

  title = ['Enregistrement Fournisseur'];

  FournisseurForm = this.formBuilder.group({
    nomFrns: ['', [Validators.required]],
    prenomFrns: ['', [Validators.required]],
    adrsFrns: ['', [Validators.required]],
    telFrns: ['', [Validators.required]],
    typeFrns: ['', [Validators.required]],
  });

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
  modifdata: any[] = [];
  formHeader = 'Valider';

  submitFournisseur() {
    // if (this.modifdata) {
    //   this.modifSubmit();
    // } else {
    this.isSubmitting = true;
    console.log('enregister leka ty');
    this.PrivateService.create(this.FournisseurForm.value).subscribe({
      next: (result) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Fournisseur enregistre',
          showConfirmButton: false,
          timer: 1500,
        }).then((res) => {
          this.isSubmitting = false;
          this.isRegisterSuccess = true;
          this.closeForm();
        });
      },
      error: () => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Fournisseur deja enregistree',
          showConfirmButton: false,
          timer: 1500,
        });
        console.log('inona le erreur : ', this.FournisseurForm.value);
        this.isSubmitting = false;
      },
    });
  }
  //}
  @Input() fournisseurData: any = new EventEmitter();

  ngOnInit() {
    if (this.fournisseurData) {
      console.log('mofifier leka ty');

      this.FournisseurForm.patchValue({
        nomFrns: this.fournisseurData.nomFrns,
        prenomFrns: this.fournisseurData.prenomFrns,
        adrsFrns: this.fournisseurData.adrsFrns,
        telFrns: this.fournisseurData.telFrns,
        typeFrns: this.fournisseurData.typeFrns,
      });
    }
  }
  modifSubmit() {
    this.isSubmitting = true;
    this.PrivateService.update(
      this.FournisseurForm.value,
      this.fournisseurData.numFrns
    ).subscribe({
      next: (res) => {
        this.title = ['Modifier Fournisseur'];
        this.formHeader = 'Modifier';
        this.isSubmitting = false;

        console.log(res);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}

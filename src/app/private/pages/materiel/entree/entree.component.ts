import { Component } from '@angular/core';
import { EntreeService } from '../../../service/entree.service';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AnneeService } from '../../../service/annee.service';
import { FactureService } from '../../../service/facture.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { PrintEntreeComponent } from '../component/print-entree/print-entree.component';

@Component({
  selector: 'app-entree',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterLink,
    PrintEntreeComponent,
  ],
  templateUrl: './entree.component.html',
  styleUrl: './entree.component.scss',
})
export class EntreeComponent {
  constructor(
    private entree: EntreeService,
    private annee: AnneeService,
    private facture: FactureService,
    private formbuilder: FormBuilder
  ) {
    this.getEntree();
    this.getFacture();
    this.getAnnee();
  }

  nomenclature: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  especeUnitaire: string[] = ['Nb', 'A', 'AN'];
  entreedata: any[] = [];
  facturedata: any[] = [];
  anneedata: any[] = [];
  PrintComponent: boolean = false;
  formHeader = 'Confirmer';
  isSubmitting: boolean = false;
  isRegisterSuccess: boolean = false;

  EntreeForm = this.formbuilder.group({
    numEntree: ['', [Validators.required]],
    nomenclature: ['', [Validators.required]],
    numFolioGL: ['', [Validators.required]],
    designation: ['', [Validators.required]],
    especeUnitaire: ['', [Validators.required]],
    quantite: ['', [Validators.required]],
    prix: ['', [Validators.required]],
    newannee: ['', [Validators.required]],
    numFacture: ['', [Validators.required]],
  });
  clear() {
    this.EntreeForm = this.formbuilder.group({
      numEntree: '',
      nomenclature: '',
      numFolioGL: '',
      designation: '',
      especeUnitaire: '',
      quantite: '',
      prix: '',
      newannee: '',
      numFacture: '',
    });
  }
  getEntree() {
    this.entree.findAll().subscribe((getAllEntree) => {
      this.entreedata = getAllEntree;
    });
  }
  getFacture() {
    this.facture.findAll().subscribe((getAllFacture) => {
      this.facturedata = getAllFacture;
    });
  }
  getAnnee() {
    this.annee.findAll().subscribe((getAllAnnee) => {
      this.anneedata = getAllAnnee;
    });
  }
  openPrint() {
    this.PrintComponent = !this.PrintComponent;
    this.getEntree();
  }

  AddEntree() {
    console.log(this.EntreeForm.value);
    console.log('NUMFACTURE', typeof this.EntreeForm.value.numFacture);
    console.log('NEWANNEE', typeof this.EntreeForm.value.newannee);
    this.isSubmitting = true;
    this.entree.create(this.EntreeForm.value).subscribe({
      next: () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Materiel d entree enregistre',
          showConfirmButton: false,
          timer: 1500,
        });
        this.isSubmitting = false;
        this.isRegisterSuccess = true;
        setTimeout(() => {
          this.getEntree();
          this.clear();
        }, 1000);
      },
      error: () => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Materiel d entree enregistree',
          showConfirmButton: false,
          timer: 1500,
        });
        this.isSubmitting = false;
      },
    });
  }
  modifEntree(item: any) {
    if (this.EntreeForm) {
      this.EntreeForm.patchValue({
        numEntree: item.numEntree,
        nomenclature: item.nomenclature,
        numFolioGL: item.numFolioGL,
        designation: item.designation,
        especeUnitaire: item.especeUnitaire,
        quantite: item.quantite,
        prix: item.prix,
        newannee: item.annee.newannee,
        numFacture: item.facture.numFacture,
      });
      this.formHeader = 'Modifier';

      this.isRegisterSuccess = false;
      this.entree.update(this.EntreeForm.value);
    }
  }

  deleteEntree(numEntree: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Voulez-vous vraiment supprimer l'entree du materiel ?",
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
            text: "l'entree du materiel supprimer avec success",
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
          this.entree.remove(numEntree).subscribe({
            next: () => {
              this.getEntree();
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

import { Component } from '@angular/core';
import { EntreeService } from '../../../service/entree.service';
import { AnneeService } from '../../../service/annee.service';
import { FactureService } from '../../../service/facture.service';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { SortieService } from '../../../service/sortie.service';
import { PrintSortieComponent } from '../component/print-sortie/print-sortie.component';

@Component({
  selector: 'app-sortie',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PrintSortieComponent,
    RouterLink,
  ],
  templateUrl: './sortie.component.html',
  styleUrl: './sortie.component.scss',
})
export class SortieComponent {
  constructor(
    private entree: EntreeService,
    private annee: AnneeService,
    private facture: FactureService,
    private sortie: SortieService,
    private formbuilder: FormBuilder
  ) {
    this.getEntree();
    this.getFacture();
    this.getAnnee();
    this.getSortie();
  }
  entreedata: any[] = [];
  sortiedata: any[] = [];
  facturedata: any[] = [];
  PrintComponent: boolean = false;
  anneedata: any[] = [];
  isSubmitting: boolean = false;
  isRegisterSuccess: boolean = false;
  nomenclature: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  especeUnitaire: string[] = ['Nb', 'A', 'AN'];

  EntreeForm = this.formbuilder.group({
    numEntree: [''],
    nomenclature: ['', [Validators.required]],
    numFolioGL: ['', [Validators.required]],
    designation: ['', [Validators.required]],
    especeUnitaire: ['', [Validators.required]],
    quantite: ['', [Validators.required]],
    prix: ['', [Validators.required]],
    newannee: ['', [Validators.required]],
    destination: ['', [Validators.required]],
  });
  SortieForm = this.formbuilder.group({
    nomenclature: ['', [Validators.required]],
    designation: ['', [Validators.required]],
    prix: ['', [Validators.required]],
  });
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
  getSortie() {
    this.sortie.findAll().subscribe((getAllSortie) => {
      this.sortiedata = getAllSortie;
    });
  }
  Click(item: any) {
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
        destination: item.facture.destination,
      });
    }
  }
  Sortie() {
    this.isSubmitting = true;
    this.sortie.create(this.SortieForm.value).subscribe({
      next: () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'le materiel a ete sortie',
          showConfirmButton: false,
          timer: 1500,
        });
        this.isSubmitting = false;
        this.isRegisterSuccess = true;
        setTimeout(() => {
          this.getSortie();
        }, 1000);
      },
      error: () => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'materiel deja sortie',
          showConfirmButton: false,
          timer: 1500,
        });

        this.isSubmitting = false;
      },
    });
  }
  deleteSortie(numSortie: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Voulez-vous vraiment supprimer cette materiel sortie ?',
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
            text: 'facture supprimer avec success',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
          this.sortie.remove(numSortie).subscribe({
            next: () => {
              this.getSortie();
            },
            error: (error) => {
              console.error(error);
            },
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Annuler',
            text: 'Suppression du materiel sortie annuler',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }
  print() {
    this.PrintComponent = !this.PrintComponent;
    this.getSortie();
  }
}

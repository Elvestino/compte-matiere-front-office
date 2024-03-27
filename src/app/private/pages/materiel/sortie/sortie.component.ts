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
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sortie',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
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
    private formbuilder: FormBuilder
  ) {
    this.getEntree();
    this.getFacture();
    this.getAnnee();
  }
  entreedata: any[] = [];
  facturedata: any[] = [];
  anneedata: any[] = [];
  nomenclature: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  especeUnitaire: string[] = ['Nb', 'A', 'AN'];

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
        numFacture: item.facture.numFacture,
      });
    }
  }
}

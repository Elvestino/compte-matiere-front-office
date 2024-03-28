import { Component } from '@angular/core';
import { AddAnneeComponent } from '../../components/add-annee/add-annee.component';
import { EntreeService } from '../../service/entree.service';
import { AnneeService } from '../../service/annee.service';
import { FactureService } from '../../service/facture.service';
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
  selector: 'app-journal',
  standalone: true,
  imports: [
    AddAnneeComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.scss',
})
export class JournalComponent {
  year: boolean = false;
  OpenAddForm() {
    this.year = !this.year;
  }
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
  Annee: boolean = false;
  isDisabled: boolean = true;

  EntreeForm = this.formbuilder.group({
    numEntree: ['', [Validators.required]],
    dateFacture: ['', [Validators.required]],
    nomenclature: ['', [Validators.required]],
    designation: ['', [Validators.required]],
    destination: ['', [Validators.required]],
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
  modifEntree(item: any) {
    if (this.EntreeForm) {
      this.EntreeForm.patchValue({
        numEntree: item.numEntree,
        nomenclature: item.nomenclature,
        dateFacture: item.facture.dateFacture,
        designation: item.designation,
        destination: item.facture.destination,
        quantite: item.quantite,
        prix: item.prix,
        newannee: item.annee.newannee,
        numFacture: item.facture.numFacture,
      });
    }
  }
}

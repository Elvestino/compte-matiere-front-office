import { Component, OnInit, ViewChild } from '@angular/core';

import { AddOrdreComponent } from './components/add-ordre/add-ordre.component';
import { AddfournisseurComponent } from './components/addfournisseur/addfournisseur.component';
import { PrivateServiceService } from '../../service/fournisseur.service';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { PrintFrnsComponent } from './components/print-frns/print-frns.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { OrdreService } from '../../service/ordre.service';
import { PrintOrdreComponent } from './components/print-ordre/print-ordre.component';

@Component({
  selector: 'app-fournisseur',
  standalone: true,
  imports: [
    CommonModule,
    AddfournisseurComponent,
    AddOrdreComponent,
    PrintFrnsComponent,
    RouterLink,
    ReactiveFormsModule,
    PrintOrdreComponent,
  ],
  templateUrl: './fournisseur.component.html',
  styleUrl: './fournisseur.component.scss',
})
export class FournisseurComponent implements OnInit {
  constructor(
    private PrivateService: PrivateServiceService,
    private OrdreService: OrdreService
  ) {}

  items: any[] = [];
  ordre: any[] = [];
  search = new FormControl();
  searchOrdre = new FormControl();

  isFournisseurComponentOpen: boolean = false;
  PrintComponent: boolean = false;
  PrintComponentOrdre: boolean = false;
  isOrdreComponentOpen: boolean = false;
  toggleOpenAddFournisseur() {
    this.isFournisseurComponentOpen = !this.isFournisseurComponentOpen;
    this.Data();
  }
  toggleOpenAddOrdre() {
    this.isOrdreComponentOpen = !this.isOrdreComponentOpen;
    this.OrdreData();
  }
  openPrint() {
    this.PrintComponent = !this.PrintComponent;
    this.Data();
  }
  openPrintOrdre() {
    this.PrintComponentOrdre = !this.PrintComponentOrdre;
    this.OrdreData();
  }
  Data() {
    this.PrivateService.findAll().subscribe((getAll) => {
      this.items = getAll;
    });
  }
  OrdreData() {
    this.OrdreService.findAll().subscribe((getAllOrdre) => {
      this.ordre = getAllOrdre;
    });
  }
  ngOnInit(): void {
    this.Data();
    this.search.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchterm) => this.PrivateService.filterFrns(searchterm))
      )
      .subscribe((filteredItems) => {
        this.items = filteredItems;
      });
    this.OrdreData();
    this.searchOrdre.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchOrdre) => this.OrdreService.filterOrdre(searchOrdre))
      )
      .subscribe((filteredOrdre) => {
        this.ordre = filteredOrdre;
      });
  }

  // -----------------------------UPDATE----------------------------
  modifData(item: any) {
    console.log(item);
    this.toggleOpenAddFournisseur();
  }
  modifDataOrdre(dataOrdre: any) {
    console.log(dataOrdre);
    this.toggleOpenAddOrdre();
    this.OrdreService.update(this.OrdreData);
    this.OrdreData();
  }

  // -----------------------------DELETE----------------------------
  deleteData(numFrns: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Voulez-vous vraiment supprimer le fournisseur ?',
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
            text: 'Fournisseur supprimer avec success',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
          this.PrivateService.remove(numFrns).subscribe({
            next: () => {
              this.Data();
            },
            error: (error) => {
              console.error(error);
            },
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Annuler',
            text: 'Suppression du fournisseur annuler',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }
  deleteDataOrdre(numOrdre: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Voulez-vous vraiment supprimer le ordre ?',
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
            text: 'Ordre supprimer avec success',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
          this.OrdreService.remove(numOrdre).subscribe({
            next: () => {
              this.OrdreData();
            },
            error: (error) => {
              console.error(error);
            },
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Annuler',
            text: 'Suppression d ordre annuler',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }
}

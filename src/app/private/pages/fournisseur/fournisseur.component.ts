import { Component, OnInit, ViewChild } from '@angular/core';

import { AddOrdreComponent } from './components/add-ordre/add-ordre.component';
import { AddfournisseurComponent } from './components/addfournisseur/addfournisseur.component';
import { PrivateServiceService } from '../../service/fournisseur.service';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PrintFrnsComponent } from './components/print-frns/print-frns.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { debounceTime, distinct, distinctUntilChanged, switchMap } from 'rxjs';

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
  ],
  templateUrl: './fournisseur.component.html',
  styleUrl: './fournisseur.component.scss',
})
export class FournisseurComponent implements OnInit {
  constructor(
    private PrivateService: PrivateServiceService,
    private formBuilder: FormBuilder
  ) {}

  items: any[] = [];
  search = new FormControl();
  isFournisseurComponentOpen: boolean = false;
  PrintComponent: boolean = false;
  isOrdreComponentOpen: boolean = false;
  toggleOpenAddFournisseur() {
    this.isFournisseurComponentOpen = !this.isFournisseurComponentOpen;
    this.Data();
  }
  toggleOpenAddOrdre() {
    this.isOrdreComponentOpen = !this.isOrdreComponentOpen;
  }
  openPrint() {
    this.PrintComponent = !this.PrintComponent;
    this.Data();
  }

  Data() {
    this.PrivateService.findAll().subscribe((getAll) => {
      this.items = getAll;
    });
  }
  ngOnInit(): void {
    this.Data();
    this.search.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchterm) => this.PrivateService.filter(searchterm))
      )
      .subscribe((filteredItems) => {
        this.items = filteredItems;
      });
  }
  modifData(item: any) {
    console.log(item);
    this.toggleOpenAddFournisseur();
    this.PrivateService.update(this.Data);
    this.Data();
  }
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
}

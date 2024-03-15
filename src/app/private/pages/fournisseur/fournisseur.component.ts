import { Component, OnInit } from '@angular/core';

import { AddOrdreComponent } from './components/add-ordre/add-ordre.component';
import { AddfournisseurComponent } from './components/addfournisseur/addfournisseur.component';
import { PrivateServiceService } from '../../service/private-service.service';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fournisseur',
  standalone: true,
  imports: [AddfournisseurComponent, AddOrdreComponent],
  templateUrl: './fournisseur.component.html',
  styleUrl: './fournisseur.component.scss',
})
export class FournisseurComponent implements OnInit {
  constructor(
    private PrivateService: PrivateServiceService,
    private formBuilder: FormBuilder,
  ) {}
  items: any[] = [];
  isFournisseurComponentOpen: boolean = false;

  isOrdreComponentOpen: boolean = false;
  toggleOpenAddFournisseur() {
    this.isFournisseurComponentOpen = !this.isFournisseurComponentOpen;
    this.Data();
  }
  toggleOpenAddOrdre() {
    this.isOrdreComponentOpen = !this.isOrdreComponentOpen;
  }

  Data() {
    this.PrivateService.findAll().subscribe((getAll) => {
      this.items = getAll;
    });
  }
  ngOnInit(): void {
    this.Data();
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

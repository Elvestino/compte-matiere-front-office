import { Component, OnInit } from '@angular/core';

import { PrivateServiceService } from '../../service/fournisseur.service';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { PrintFrnsComponent } from './components/print-frns/print-frns.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { OrdreService } from '../../service/ordre.service';
import { PrintOrdreComponent } from './components/print-ordre/print-ordre.component';
import { FournisseurModel } from '../../models/fournisseur.models';
import { OrdreModel } from '../../models/ordre.model';
import { ServiceService } from '../../service/service.service';
import { AnneeService } from '../../service/annee.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fournisseur',
  standalone: true,
  imports: [
    CommonModule,
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
    private OrdreService: OrdreService,
    private ordreService: OrdreService,
    private service: ServiceService,
    private annee: AnneeService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.OrdreData();
    this.Data();
  }

  items: any[] = [];
  ordre: any[] = [];
  isAddLivre: boolean = false;

  search = new FormControl();
  isModifAction: boolean = false;
  isFournisseurComponentOpen: boolean = false;
  PrintComponent: boolean = false;
  PrintComponentOrdre: boolean = false;
  isOrdreComponentOpen: boolean = false;

  selectedData: FournisseurModel = {
    numFrns: '',
    nomFrns: '',
    prenomFrns: '',
    adrsFrns: '',
    telFrns: '',
    typeFrns: '',
  };
  selectDataOrdre: OrdreModel = {
    numService: {
      libelle: '',
      nomService: '',
      numService: '',
      SOA: '',
      typeService: '',
    },
    dateOrdre: new Date(),
    newannee: {
      newannee: 0,
    },
    numOrdre: '',
  };
  closeCard() {
    this.isFournisseurComponentOpen = false;
  }
  openAddFrounisseur() {
    this.isFournisseurComponentOpen = true;
  }
  CloseCardOrdre() {
    this.isOrdreComponentOpen = false;
  }
  OpenAddOrdre() {
    this.isOrdreComponentOpen = true;
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
        switchMap((searchterm) =>
          this.http.get<any[]>(`http://localhost:4080/api/fournisseur`).pipe(
            map((data) => {
              return data.filter((item) => {
                return (
                  item.nomFrns
                    .toLowerCase()
                    .includes(searchterm.toLowerCase()) ||
                  item.prenomFrns
                    .toLowerCase()
                    .includes(searchterm.toLowerCase()) ||
                  item.adrsFrns
                    .toLowerCase()
                    .includes(searchterm.toLowerCase()) ||
                  item.typeFrns
                    .toLowerCase()
                    .includes(searchterm.toLowerCase()) ||
                  item.telFrns.toLowerCase().includes(searchterm.toLowerCase())
                );
              });
            })
          )
        )
      )
      .subscribe((filteredItems) => {
        this.items = filteredItems;
      });
  }

  // -----------------------------UPDATE----------------------------
  modifData(item: FournisseurModel) {
    this.isModifAction = true;
    this.FournisseurForm.patchValue({
      nomFrns: item.nomFrns,
      adrsFrns: item.adrsFrns,
      prenomFrns: item.prenomFrns,
      telFrns: item.telFrns,
      typeFrns: item.typeFrns,
    });
    this.selectedData = item;
    this.isFournisseurComponentOpen = true;
  }

  modifDataOrdre(dataOrdre: OrdreModel) {
    this.isModifAction = true;
    this.OrdreForm.patchValue({
      dateOrdre: new Date().toISOString().split('T')[0],
      newannee: dataOrdre.newannee.newannee.toString(),

      nomService: dataOrdre.numService.nomService,
    });
    this.selectDataOrdre = dataOrdre;
    this.isOrdreComponentOpen = true;
  }

  // -----------------------------DELETE----------------------------
  deleteData(numFrns: string) {
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
  deleteDataOrdre(numOrdre: string) {
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

  ////////////////////////////ADD FOURNISSEUR///////////////
  title = 'Enregistrement ';

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
    this.isSubmitting = true;

    if (this.isModifAction == true) {
      // requete send modif
      this.title = 'Modifier Fournisseur';
      this.formHeader = 'Modifier';
      const updatedFrns = {
        ...this.FournisseurForm.value,
      };
      this.PrivateService.update(
        updatedFrns,
        this.selectedData.numFrns
      ).subscribe({
        next: (res) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Fournisseur modifier',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.Data();
            this.FournisseurForm.reset();
            this.isSubmitting = false;
            this.isRegisterSuccess = false;
            this.closeCard();
          });
        },
        error: (err) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Erreur lors de la modification du fournisseur',
            showConfirmButton: false,
            timer: 1500,
          });
          console.error('Erreur lors de la modification :', err);
          this.isSubmitting = false;
          this.isRegisterSuccess = false;
        },
      });
    } else {
      this.isSubmitting = true;

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
            this.closeCard();
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
  }

  /////////////////////ORDRE///////////////////
  servicedata: any[] = [];
  AnnneeData: any[] = [];

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
    this.isSubmitting = true;

    if (this.isModifAction == true) {
      // requete send modif
      this.title = 'Modifier Ordre';
      this.formHeader = 'Modifier';
      const updatedOrdre = {
        ...this.OrdreForm.value,
      };
      this.ordreService
        .update(updatedOrdre, this.selectDataOrdre.numOrdre)
        .subscribe({
          next: (res) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Ordre modifier',
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              this.Data();
              this.OrdreForm.reset();
              this.isSubmitting = false;
              this.isRegisterSuccess = false;
              this.CloseCardOrdre();
            });
          },
          error: (err) => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Erreur lors de la modification du ordre',
              showConfirmButton: false,
              timer: 1500,
            });
            console.error('Erreur lors de la modification :', err);
            this.isSubmitting = false;
            this.isRegisterSuccess = false;
          },
        });
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
            this.CloseCardOrdre();
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
}

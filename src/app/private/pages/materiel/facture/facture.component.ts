import { Component } from '@angular/core';
import { FactureService } from '../../../service/facture.service';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { OrdreService } from '../../../service/ordre.service';
import { PrivateServiceService } from '../../../service/fournisseur.service';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { PrintFactureComponent } from '../component/print-facture/print-facture.component';

@Component({
  selector: 'app-facture',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    PrintFactureComponent,
    RouterLink,
  ],
  templateUrl: './facture.component.html',
  styleUrl: './facture.component.scss',
})
export class FactureComponent {
  constructor(
    private facture: FactureService,
    private formBuilder: FormBuilder,
    private fournisseur: PrivateServiceService,
    private ordre: OrdreService
  ) {
    this.getDataFacture();
    this.getDataFournisseur();
    this.getDataOrdre();
  }
  openmodal: boolean = false;
  formHeader = 'Confirmer';
  add = "Enregistrement d'un facture";
  openModif: boolean = false;
  dataFacture: any[] = [];
  dataFrns: any[] = [];
  dataOrdre: any[] = [];
  isSubmitting: boolean = false;
  isRegisterSuccess: boolean = false;
  PrintComponent: boolean = false;

  FactureForm = this.formBuilder.group({
    numFacture: [''],
    dateFacture: ['', [Validators.required]],
    destination: ['', [Validators.required]],
    LieuFacture: ['', [Validators.required]],
    typeFacture: ['', [Validators.required]],
    objetFacture: ['', [Validators.required]],
    montantFacture: ['', [Validators.required]],
    nomFrns: ['', [Validators.required]],
  });

  clear() {
    this.FactureForm = this.formBuilder.group({
      numFacture: '',
      dateFacture: '',
      destination: '',
      LieuFacture: '',
      typeFacture: '',
      objetFacture: '',
      montantFacture: '',
      nomFrns: '',
    });
  }
  openPrint() {
    this.PrintComponent = !this.PrintComponent;
    this.getDataFacture();
  }

  get destination() {
    return this.FactureForm.get('destination');
  }
  get objetFacture() {
    return this.FactureForm.get('objetFacture');
  }
  get LieuFacture() {
    return this.FactureForm.get('LieuFacture');
  }
  get montantFacture() {
    return this.FactureForm.get('montantFacture');
  }
  get typeFacture() {
    return this.FactureForm.get('typeFacture');
  }
  getDataFacture() {
    this.facture.findAll().subscribe({
      next: (res) => {
        this.dataFacture = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  getDataFournisseur() {
    this.fournisseur.findAll().subscribe((getAllFrns) => {
      this.dataFrns = getAllFrns;
    });
  }
  getDataOrdre() {
    this.ordre.findAll().subscribe((getAllOrdre) => {
      this.dataOrdre = getAllOrdre;
    });
  }

  submitFacture() {
    if (this.openModif) {
      this.submitModifacture();
      this.clear();
      this.formHeader = 'Confirmer';
      this.add = "Enregistrement d'un facture";
    } else {
      this.isSubmitting = true;
      this.facture.create(this.FactureForm.value).subscribe({
        next: () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Facture enregistre',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.getDataFacture();
            this.clear();
          });
        },
        error: () => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'facture deja enregistree',
            showConfirmButton: false,
            timer: 1500,
          });

          this.isSubmitting = false;
        },
      });
    }
  }
  modifFacture(item: any) {
    this.openModif = true;
    this.openmodal = true;
    if (this.FactureForm) {
      this.FactureForm.patchValue({
        numFacture: item.numFacture,
        dateFacture: item.dateFacture,
        destination: item.destination,
        LieuFacture: item.LieuFacture,
        typeFacture: item.typeFacture,
        objetFacture: item.objetFacture,
        montantFacture: item.montantFacture,
        nomFrns: item.fournisseur.nomFrns,
      });
      this.formHeader = 'Modifier';
      this.add = 'Modifier Facture';
      this.isRegisterSuccess = false;

      this.isRegisterSuccess = false;
    }
  }

  submitModifacture() {
    this.isSubmitting = true;
    this.facture.update(this.FactureForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.getDataFacture();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  deleteFacture(numFacture: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Voulez-vous vraiment supprimer le facture ?',
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
          this.facture.remove(numFacture).subscribe({
            next: () => {
              this.getDataFacture();
              this.clear();
            },
            error: (error) => {
              console.error(error);
            },
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Annuler',
            text: 'Suppression du facture annuler',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }
}

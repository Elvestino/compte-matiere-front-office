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
  formHeader = 'Confirmer';
  dataFacture: any[] = [];
  dataFrns: any[] = [];
  dataOrdre: any[] = [];
  FactureForm = this.formBuilder.group({
    numFacture: ['', [Validators.required]],
    dateFacture: ['', [Validators.required]],
    destination: ['', [Validators.required]],
    LieuFacture: ['', [Validators.required]],
    typeFacture: ['', [Validators.required]],
    objetFacture: ['', [Validators.required]],
    montantFacture: ['', [Validators.required]],
    numFrns: ['', [Validators.required]],
    numOrdre: ['', [Validators.required]],
  });

  isSubmitting: boolean = false;
  isRegisterSuccess: boolean = false;
  PrintComponent: boolean = false;

  clear() {
    this.FactureForm = this.formBuilder.group({
      numFacture: '',
      dateFacture: '',
      destination: '',
      LieuFacture: '',
      typeFacture: '',
      objetFacture: '',
      montantFacture: '',
      numFrns: '',
      numOrdre: '',
    });
  }
  openPrint() {
    this.PrintComponent = !this.PrintComponent;
    this.getDataFacture();
  }

  get numFacture() {
    return this.FactureForm.get('numFacture');
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
    this.facture.findAll().subscribe((getAll) => {
      this.dataFacture = getAll;
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
    this.isSubmitting = true;
    console.log('DATA :', this.FactureForm.value);
    console.log('DATA1111 :', this.FactureForm.value.numFrns);
    this.facture.create(this.FactureForm.value).subscribe({
      next: () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Facture enregistre',
          showConfirmButton: false,
          timer: 1500,
        });
        this.isSubmitting = false;
        this.isRegisterSuccess = true;
        setTimeout(() => {
          this.getDataFacture();
          this.clear();
        }, 1000);
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

  modifFacture(item: any) {
    if (this.FactureForm) {
      this.FactureForm.patchValue({
        numFacture: item.numFacture,
        dateFacture: item.dateFacture,
        destination: item.destination,
        LieuFacture: item.LieuFacture,
        typeFacture: item.typeFacture,
        objetFacture: item.objetFacture,
        montantFacture: item.montantFacture,
        numFrns: item.fournisseur.numFrns,
        numOrdre: item.ordre.numOrdre,
      });
      this.formHeader = 'Modifier';

      this.isRegisterSuccess = false;
      this.facture.update(this.FactureForm.value);
    }
  }

  deleteFacture(numFacture: number) {
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

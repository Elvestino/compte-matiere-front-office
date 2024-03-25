import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrdreService } from '../../../../service/ordre.service';
import { RouterLink } from '@angular/router';
import { ServiceService } from '../../../../service/service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-ordre',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, FormsModule],
  templateUrl: './add-ordre.component.html',
  styleUrl: './add-ordre.component.scss',
})
export class AddOrdreComponent {
  constructor(
    private ordreService: OrdreService,
    private service: ServiceService,
    private formBuilder: FormBuilder
  ) {
    this.getService();
  }

  @Output() close = new EventEmitter();
  closeForm(): void {
    this.close.emit();
  }
  servicedata: any[] = [];
  servicedatasecond: any[] = [];
  selectedService: any = {};
  title: string[] = ['Enregistrement Ordre'];
  OrdreForm = this.formBuilder.group({
    numOrdre: ['', [Validators.required]],
    dateOrdre: ['', [Validators.required]],
    numService: ['', [Validators.required]],
    nomService: ['', [Validators.required]],
  });

  get numOrdre() {
    return this.OrdreForm.get('numOrdre');
  }

  getService() {
    this.service.findAll().subscribe((getAll) => {
      this.servicedata = getAll;
    });
  }
  updateNomService(selectedNumService: any) {
    const selectedService = this.servicedata.find(
      (service) => service.numService === selectedNumService
    );
    if (selectedService) {
      this.OrdreForm.patchValue({ nomService: selectedService.nomService });
      // Update the second select options if needed
      this.servicedatasecond = selectedService.someOtherData; // Update this line with appropriate data
    } else {
      this.OrdreForm.patchValue({ nomService: '' }); // Reset the field if no match found
    }
  }
}

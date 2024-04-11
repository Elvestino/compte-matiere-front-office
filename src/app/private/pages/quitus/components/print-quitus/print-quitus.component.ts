import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { QuitusService } from '../../../../service/quitus.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../../../../service/service.service';

@Component({
  selector: 'app-print-quitus',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './print-quitus.component.html',
  styleUrl: './print-quitus.component.scss',
})
export class PrintQuitusComponent {
  constructor(
    private QuitusS: QuitusService,
    private service: ServiceService,
    private formBuilder: FormBuilder
  ) {
    this.getService();
    this.getQuitus();
  }
  quitusdata: any[] = [];
  servicedata: any[] = [];
  QuitusForm = this.formBuilder.group({
    numQuitus: [''],
    dateQuitus: ['', [Validators.required]],
    nomService: ['', [Validators.required]],
    observateur: ['', [Validators.required]],
    ReferenceQuitus: ['', [Validators.required]],
    objetQuitus: ['', [Validators.required]],
    montantQuitus: ['', [Validators.required]],
    exerciceAnnee: ['', [Validators.required]],
  });
  @ViewChild('content', { static: false }) content: any;

  getService() {
    this.service.findAll().subscribe((getAll) => {
      this.servicedata = getAll;
    });
  }
  getQuitus() {
    this.QuitusS.findAll().subscribe((getAll) => {
      this.quitusdata = getAll;
    });
  }
  @Output() close = new EventEmitter();
  closePrint(): void {
    this.close.emit();
  }
  printQuitus() {
    const content = this.content.nativeElement;
    html2canvas(content).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const image = canvas.toDataURL('image/png');
      const imgwidth = 190;
      const imgheight = (canvas.height * imgwidth) / canvas.width;
      pdf.addImage(image, 'PNG', 10, 10, imgwidth, imgheight);
      pdf.save('Quitus.pdf');
    });
    this.close.emit();
  }
  modifAquitus(item: any) {
    if (this.QuitusForm) {
      this.QuitusForm.patchValue({
        numQuitus: item.numQuitus,
        dateQuitus: item.dateQuitus,
        nomService: item.service.nomService,
        observateur: item.observateur,
        ReferenceQuitus: item.ReferenceQuitus,
        montantQuitus: item.montantQuitus,
        exerciceAnnee: item.exerciceAnnee,
        objetQuitus: item.objetQuitus,
      });
    }
  }
}

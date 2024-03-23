import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { PrivateServiceService } from '../../../../service/fournisseur.service';
import { FormBuilder } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-print-frns',
  standalone: true,
  imports: [],
  templateUrl: './print-frns.component.html',
  styleUrl: './print-frns.component.scss',
})
export class PrintFrnsComponent implements OnInit {
  constructor(
    private PrivateService: PrivateServiceService,
    private formBuilder: FormBuilder
  ) {}
  items: any[] = [];
  @ViewChild('content', { static: false }) content: any;
  Data() {
    this.PrivateService.findAll().subscribe((getAll) => {
      this.items = getAll;
    });
  }

  ngOnInit(): void {
    this.Data();
  }

  @Output() close = new EventEmitter();
  closePrint(): void {
    this.close.emit();
  }
  printFournisseur() {
    const content = this.content.nativeElement;
    html2canvas(content).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const image = canvas.toDataURL('image/png');
      const imgwidth = 190;
      const imgheight = (canvas.height * imgwidth) / canvas.width;
      pdf.addImage(image, 'PNG', 10, 10, imgwidth, imgheight);
      pdf.save('Fournisseur.pdf');
    });
    this.close.emit();
  }
}

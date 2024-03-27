import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import html2canvas from 'html2canvas';
import { FactureService } from '../../../../service/facture.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-print-facture',
  standalone: true,
  imports: [],
  templateUrl: './print-facture.component.html',
  styleUrl: './print-facture.component.scss',
})
export class PrintFactureComponent implements OnInit {
  constructor(private facture: FactureService) {}
  dataFacture: any[] = [];
  @ViewChild('content', { static: false }) content: any;
  Data() {
    this.facture.findAll().subscribe((getAll) => {
      this.dataFacture = getAll;
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
      pdf.save('Facture.pdf');
    });
    this.close.emit();
  }
}

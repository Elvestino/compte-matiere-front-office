import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { PrivateServiceService } from '../../../../service/fournisseur.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { OrdreService } from '../../../../service/ordre.service';

@Component({
  selector: 'app-print-ordre',
  standalone: true,
  imports: [],
  templateUrl: './print-ordre.component.html',
  styleUrl: './print-ordre.component.scss',
})
export class PrintOrdreComponent implements OnInit {
  constructor(
    private PrivateService: PrivateServiceService,
    private OrdreService: OrdreService
  ) {}
  ordre: any[] = [];
  items: any[] = [];
  @ViewChild('content', { static: false }) content: any;
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
    this.OrdreData();
  }

  @Output() close = new EventEmitter();
  closePrint(): void {
    this.close.emit();
  }
  printOrdre() {
    const content = this.content.nativeElement;
    html2canvas(content).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const image = canvas.toDataURL('image/png');
      const imgwidth = 190;
      const imgheight = (canvas.height * imgwidth) / canvas.width;
      pdf.addImage(image, 'PNG', 10, 10, imgwidth, imgheight);
      pdf.save('Ordre.pdf');
    });
    this.close.emit();
  }
}

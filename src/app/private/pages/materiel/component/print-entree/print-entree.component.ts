import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { EntreeService } from '../../../../service/entree.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-print-entree',
  standalone: true,
  imports: [],
  templateUrl: './print-entree.component.html',
  styleUrl: './print-entree.component.scss',
})
export class PrintEntreeComponent implements OnInit {
  constructor(private entree: EntreeService) {}
  entreedata: any[] = [];
  @ViewChild('content', { static: false }) content: any;
  Data() {
    this.entree.findAll().subscribe((getAll) => {
      this.entreedata = getAll;
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
      pdf.save('Entree.pdf');
    });
    this.close.emit();
  }
}

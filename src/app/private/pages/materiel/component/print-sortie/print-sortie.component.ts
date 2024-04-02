import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { SortieService } from '../../../../service/sortie.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-print-sortie',
  standalone: true,
  imports: [],
  templateUrl: './print-sortie.component.html',
  styleUrl: './print-sortie.component.scss',
})
export class PrintSortieComponent implements OnInit {
  constructor(private sortie: SortieService) {}
  sortiedata: any[] = [];
  @ViewChild('content', { static: false }) content: any;
  Data() {
    this.sortie.findAll().subscribe((getAll) => {
      this.sortiedata = getAll;
    });
  }

  ngOnInit(): void {
    this.Data();
  }

  @Output() close = new EventEmitter();
  closePrint(): void {
    this.close.emit();
  }
  printSortie() {
    const content = this.content.nativeElement;
    html2canvas(content).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const image = canvas.toDataURL('image/png');
      const imgwidth = 190;
      const imgheight = (canvas.height * imgwidth) / canvas.width;
      pdf.addImage(image, 'PNG', 10, 10, imgwidth, imgheight);
      pdf.save('Materiel_Sortie.pdf');
    });
    this.close.emit();
  }
}

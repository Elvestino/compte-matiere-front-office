import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { QuitusService } from '../../../../service/quitus.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-print-quitus',
  standalone: true,
  imports: [],
  templateUrl: './print-quitus.component.html',
  styleUrl: './print-quitus.component.scss',
})
export class PrintQuitusComponent {
  constructor(private QuitusS: QuitusService) {
    this.getQuitus();
  }
  quitusdata: any[] = [];
  @ViewChild('content', { static: false }) content: any;

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
}

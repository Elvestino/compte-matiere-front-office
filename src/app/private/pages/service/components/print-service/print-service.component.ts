import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ServiceService } from '../../../../service/service.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-print-service',
  standalone: true,
  imports: [],
  templateUrl: './print-service.component.html',
  styleUrl: './print-service.component.scss',
})
export class PrintServiceComponent implements OnInit {
  constructor(private Service: ServiceService) {}
  data: any[] = [];
  @ViewChild('content', { static: false }) content: any;
  Data() {
    this.Service.findAll().subscribe((getAll) => {
      this.data = getAll;
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
      pdf.save('Service.pdf');
    });
    this.close.emit();
  }
}

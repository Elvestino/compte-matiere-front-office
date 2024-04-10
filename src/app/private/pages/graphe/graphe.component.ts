import { Component } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import { ServiceService } from '../../service/service.service';
import { QuitusService } from '../../service/quitus.service';
import { PrivateServiceService } from '../../service/fournisseur.service';
import { EntreeService } from '../../service/entree.service';
import { SortieService } from '../../service/sortie.service';
import { FactureService } from '../../service/facture.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-graphe',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './graphe.component.html',
  styleUrl: './graphe.component.scss',
})
export class GrapheComponent {
  constructor(
    private service: ServiceService,
    private quitus: QuitusService,
    private frns: PrivateServiceService,
    private entree: EntreeService,
    private sortie: SortieService,
    private facture: FactureService
  ) {
    this.getService();
    this.getfrns();
    this.getsortie();
    this.getQuitus();
    this.getfacture();
    this.getentree();
  }

  // --------------service------------------
  servicedata: any[] = [];
  getService() {
    this.service.findAll().subscribe({
      next: (res) => {
        this.servicedata = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  getTotalCount(): number {
    return this.servicedata.length;
  }

  // --------------quitus------------------
  quitusdata: any[] = [];
  getQuitus() {
    this.quitus.findAll().subscribe({
      next: (res) => {
        this.quitusdata = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  quitustotal(): number {
    return this.quitusdata.length;
  }

  // --------------quitus------------------
  frnsdata: any[] = [];
  getfrns() {
    this.frns.findAll().subscribe({
      next: (res) => {
        this.frnsdata = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  frnstotal(): number {
    return this.frnsdata.length;
  }

  // --------------entree------------------
  entreedata: any[] = [];
  getentree() {
    this.entree.findAll().subscribe({
      next: (res) => {
        this.entreedata = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  entreetotal(): number {
    return this.entreedata.length;
  }

  // --------------sortie------------------
  sortiedata: any[] = [];
  getsortie() {
    this.sortie.findAll().subscribe({
      next: (res) => {
        this.sortiedata = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  sortietotal(): number {
    return this.sortiedata.length;
  }

  // --------------facture------------------
  facturedata: any[] = [];
  getfacture() {
    this.facture.findAll().subscribe({
      next: (res) => {
        this.facturedata = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  facturetotal(): number {
    return this.facturedata.length;
  }
}

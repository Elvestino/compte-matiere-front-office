import { Component, OnInit } from '@angular/core';

import { ServiceService } from '../../service/service.service';
import { QuitusService } from '../../service/quitus.service';
import { PrivateServiceService } from '../../service/fournisseur.service';
import { EntreeService } from '../../service/entree.service';
import { SortieService } from '../../service/sortie.service';
import { FactureService } from '../../service/facture.service';
import { RouterLink } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { FournisseurModel } from '../../models/fournisseur.models';
import { FactureModel } from '../../models/facture.model';
import { SortieModel } from '../../models/sortie.model';
import { ServiceModel } from '../../models/service.model';
import { QuitusModel } from '../../models/quitus.model';
import { EntreeModel } from '../../models/entree.model';
import { AnneeService } from '../../service/annee.service';
import { AnneeModel } from '../../models/annee.model';
@Component({
  selector: 'app-graphe',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './graphe.component.html',
  styleUrl: './graphe.component.scss',
})
export class GrapheComponent implements OnInit {
  constructor(
    private service: ServiceService,
    private quitus: QuitusService,
    private frns: PrivateServiceService,
    private entree: EntreeService,
    private sortie: SortieService,
    private facture: FactureService,
    private annee: AnneeService
  ) {
    this.getService();
    this.getfrns();
    this.getsortie();
    this.getQuitus();
    this.getfacture();
    this.getannee();
    this.getentree();
  }
  ngOnInit(): void {
    this.getService();
    this.getfrns();
    this.getsortie();
    this.getannee();
    this.getQuitus();
    this.getfacture();
    this.getentree();
    /////////////////////CHART Total//////////////////////

    const emprunteCanvas: any = document.getElementById('emprunter_chart');
    const enpre = new Chart(emprunteCanvas.getContext('2d'), {
      type: 'pie',
      data: {
        labels: [
          " Total de materiel d'entree",
          ' Total de facture',
          ' Total de quitus',
          ' Total de service',
          ' Total de materiel de sortie',
          ' Total de fournisseur',
        ],
        datasets: [
          {
            data: [
              this.entreetotal(),
              this.facturetotal(),
              this.quitustotal(),
              this.getTotalCount(),
              this.sortietotal(),
              this.frnstotal(),
            ],
            label: 'nombres ',
            borderColor: this.color,
            backgroundColor: this.color,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    /////////////////////CHART COUNT PAR TYPE//////////////////////
    for (let i = 0; i < this.facturedata.length; i++) {
      const element = this.facturedata[i].destination;
      this.categories.push(element);
      this.CountCategories = this.countOccurence(this.categories);
      this.Uniquecategories = this.getUniqueCategories(this.categories);
    }
    const barCanvasEle: any = document.getElementById('bar_chart');
    const barChart = new Chart(barCanvasEle.getContext('2d'), {
      type: 'bar',
      data: {
        labels: this.Uniquecategories,
        datasets: [
          {
            label: 'Materiel',
            data: this.CountCategories,
            backgroundColor: this.color,
            borderColor: this.color,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    /////////////////MATERIEL ENTREE ET SORTIE PAR AN/////////////

    for (let i = 0; i < this.anneedata.length; i++) {
      const element1 = this.anneedata[i].newannee;
      this.categoriesAnnee.push(element1);
    }
    this.CountCategoriesannee = this.countOccurenceannee(this.categoriesAnnee);
    this.Uniquecategoriesannee = this.getUniqueCategoriesannee(
      this.categoriesAnnee
    );
    console.log(this.categoriesAnnee);

    // for (let i = 0; i < this.sortiedata.length; i++) {
    //   const element2 = this.sortiedata[i].;

    //   this.categories.push(element2);
    //   console.log('annee sortie :', element2);

    //   this.CountCategories = this.countOccurence(this.categories);
    //   this.Uniquecategories = this.getUniqueCategories(this.categories);
    // }
    const barCanvasEmprunt: any = document.getElementById('bar_chart_emprunt');
    const barChartEmprunt = new Chart(barCanvasEmprunt.getContext('2d'), {
      type: 'bar',
      data: {
        labels: this.Uniquecategoriesannee, // Unique years on x-axis
        datasets: [
          {
            label: 'Total',
            data: this.Uniquecategoriesannee.map(
              (year) => this.CountCategoriesannee[year]
            ), // Corresponding counts on y-axis
            backgroundColor: this.color,
            borderColor: this.color,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  //----------------annee-----------------
  anneedata: AnneeModel[] = [];
  getannee() {
    this.annee.findAll().subscribe({
      next: (res) => {
        this.anneedata = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // --------------service------------------
  servicedata: ServiceModel[] = [];
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
  quitusdata: QuitusModel[] = [];
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
  frnsdata: FournisseurModel[] = [];
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
  entreedata: EntreeModel[] = [];
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
  sortiedata: SortieModel[] = [];
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
  facturedata: FactureModel[] = [];
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

  ///////////////////////CHART//////////////////
  color: any = [
    '#00CED1',
    '#CE2029',
    '#87421F',
    '#0048BA',
    '#B0BF1A',
    '#DB2D43',
    '#9F2B68',
    '3DDC84',
    '#665D1E',
    '#4B6F44',
    '#FDEE00',
    '#7C0A02',
    '#7BB661',
    '#3D2B1F',
    '#CC5500',
    '#FFEF00',
  ];
  categories: string[] = [];
  Uniquecategories: string[] = [];
  CountCategories: { [key: string]: number } = {};
  countOccurence(categories: string[]): { [key: string]: number } {
    return categories.reduce(
      (acc: { [key: string]: number }, category: string) => {
        acc[category] = (acc[category] || 0) + 1;

        return acc;
      },
      {}
    );
  }
  getUniqueCategories(categories: string[]): string[] {
    return Array.from(new Set(categories));
  }

  ////////////////////////ANNEE////////////////////
  categoriesAnnee: number[] = [];
  Uniquecategoriesannee: number[] = [];
  CountCategoriesannee: { [key: number]: number } = {};

  countOccurenceannee(categories: number[]): { [key: number]: number } {
    return categories.reduce(
      (acc: { [key: number]: number }, category: number) => {
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      },
      {}
    );
  }

  getUniqueCategoriesannee(categories: number[]): number[] {
    return Array.from(new Set(categories));
  }
}

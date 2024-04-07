import { Component, OnInit } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { AnneeService } from '../../service/annee.service';
@Component({
  selector: 'app-graphe',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './graphe.component.html',
  styleUrl: './graphe.component.scss',
})
export class GrapheComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    accessibility: {
      enabled: false,
    },
    xAxis: {
      categories: [],
    } as Highcharts.XAxisOptions,
    yAxis: {
      title: {
        text: "Nombre d'entrées d'un matériel",
      },
    },
    title: {
      text: "Graphique d'entrées d'un matériel",
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        data: [1, 2, 5],
        type: 'line',
      },
    ],
  };

  constructor(private anneeService: AnneeService) {}

  ngOnInit(): void {
    this.anneeService.findAll().subscribe(
      (anneeData: any[]) => {
        if (anneeData && anneeData.length > 0) {
          console.log(anneeData);
          const categories = anneeData.map((item) => item.annee);
          // Mettez à jour xAxis avec les catégories récupérées
          this.chartOptions.xAxis = {
            categories: [],
            title: {
              text: 'Année',
            },
          };
        } else {
          console.error("Les données d'année sont vides ou non définies.");
        }
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des données d'année :",
          error
        );
      }
    );
  }
}

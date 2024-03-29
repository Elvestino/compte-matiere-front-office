import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetuserService } from '../../service/getuser.service';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';
import { EMPTY } from 'rxjs';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, HttpClientModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  constructor(private AuthService: AuthService, private users: GetuserService) {
    this.dateAujourdhui = this.obtenirDateAujourdhui();
    // this.anneeActuelle = this.obtenirAnneeActuelle();
    this.heureActuelle = this.obtenirHeureActuelle();
    //this.getUser(this.users);
  }
  heureActuelle: string;
  dateAujourdhui: string;
  // anneeActuelle: number;
  data: any[] = [];
  open: boolean = true;
  OpenHome() {
    this.open = !this.open;
  }
  CloseHome() {
    this.open = true;
  }
  logOut() {
    this.AuthService.logOut();
  }
  ngOnInit(): void {
    // Appeler la fonction pour obtenir l'heure actuelle au démarrage
    this.obtenirHeureActuelle();

    // Indexer l'heure chaque seconde
    setInterval(() => {
      this.obtenirHeureActuelle();
    }, 1000); // Interval d'une seconde
  }
  obtenirHeureActuelle(): any {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    this.heureActuelle = `${hours}:${minutes}:${seconds}`;
  }
  obtenirDateAujourdhui(): string {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  // ngOnInit(): void {
  //   this.getUser('1'); // Suppose que vous voulez récupérer l'utilisateur avec l'ID 1
  // }

  // getUser() {
  //   console.log(this.users);
  //   this.users.getImmatricule();
  // }
}

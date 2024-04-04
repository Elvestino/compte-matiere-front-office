import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GetuserService } from '../../service/getuser.service';
import { CommonModule } from '@angular/common';

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

    this.heureActuelle = this.obtenirHeureActuelle();
  }
  heureActuelle: string;
  dateAujourdhui: string;
  immatricule: any;
  userData: any;
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
    this.obtenirHeureActuelle();

    setInterval(() => {
      this.obtenirHeureActuelle();
    }, 1000);
    const token = localStorage.getItem('access_token');
    console.log(token);
    if (token) {
      this.users.findAll(token).subscribe(
        (data) => {
          this.userData = data;
          console.log(data);
        },
        (error) => {
          console.log('Erreur lors de la récupération des données : ', error);
        }
      );
    }
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
}

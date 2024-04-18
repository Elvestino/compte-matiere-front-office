import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, HttpClientModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private apiUrl = environment.apiBaseURL;
  constructor(private AuthService: AuthService, private http: HttpClient) {
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
    this.open = false;
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

    return `${day}-${month}-${year}`;
  }
}

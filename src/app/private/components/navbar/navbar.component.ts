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
export class NavbarComponent {
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
  obtenirHeureActuelle(): string {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
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

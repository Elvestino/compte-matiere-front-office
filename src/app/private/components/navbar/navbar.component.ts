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
    //this.getUser(this.users);
  }

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
  // ngOnInit(): void {
  //   this.getUser('1'); // Suppose que vous voulez récupérer l'utilisateur avec l'ID 1
  // }

  // getUser() {
  //   console.log(this.users);
  //   this.users.getImmatricule();
  // }
}

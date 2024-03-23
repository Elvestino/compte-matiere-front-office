import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './../../../shared/services/auth.service';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetuserService } from '../../service/getuser.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, HttpClientModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private AuthService: AuthService, private users: GetuserService) {
    // this.getData();
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

  // getData() {
  //   this.AuthService.getImmatricule().then((immatricule) => {
  //     if (immatricule) {
  //       this.users.findOne(immatricule).subscribe((userData) => {
  //         this.data = userData;
  //       });
  //     }
  //   });
  // }
}

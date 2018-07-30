import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  logout() {
    this.authService.logout();

    if (!this.authService.checkLogin()) {
      this.router.navigateByUrl('home');
    }
  }
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

}

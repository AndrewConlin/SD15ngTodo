import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login(form: NgForm) {
    this.authService.login(form.value.username, form.value.password).subscribe(
      (data) => {
        form.reset();
        this.router.navigateByUrl('todos');
      },
      (err) => console.log(err)
    );
  }
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

}

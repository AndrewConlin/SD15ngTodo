import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register(form: NgForm) {
    const user: User = new User(form.value.username, form.value.email, form.value.password);

    this.authService.register(user).subscribe(
      (data) => {
        console.log('registered');
        this.router.navigateByUrl('todos');
      },
      (err) => console.log(err)
    );
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

}

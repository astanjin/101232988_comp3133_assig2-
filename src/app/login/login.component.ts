import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: LoginService
  ) {}

  ngOnInit() {}

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.service.login(this.loginForm.value).subscribe(
        (res) => {
          let temp: any = res;
          if (temp.result) {
            this.router.navigate(['/customer']);
            console.log(temp);
            localStorage.setItem('token', temp.token);
            localStorage.setItem('email', temp.email);
          } else {
          }
        },
        (err) => {
          alert('Wrong email or password');
          console.log(err);
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}

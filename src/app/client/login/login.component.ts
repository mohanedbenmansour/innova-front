import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { TokenStorageService } from 'src/app/core/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: string[] = [];
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router,
    private _snackBar: MatSnackBar,

    ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().role;
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;
    this.authService.login(email, password).subscribe(
      data => {
        let user = data.find((user: any) => {
          return user.email == email && user.password == password
        })
        if (user) {
          this.tokenStorage.saveToken(user.accessToken);
          this.tokenStorage.saveUser(user);
          if (user.role == "ADMIN") {
            this.router.navigate(["/dashboard/clients"])
          } else {
            this.router.navigate(["/front-office"])
          }
        } else {
          this.openSnackBar("check username and password",'login failed ')
          this.isLoginFailed = false;
          this.isLoggedIn = false;
        }
        console.log("data", data)
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = "";
  senha: string = "";
  token: string = "";
  mfaEnabled: string = "";
  verificationToken: string = "";

  constructor(private router: Router, private loginService: LoginService) { }

  redirectUser() {
    if (!this.mfaEnabled) {
      this.router.navigate(['/sign-in']);
      return;
    }
    sessionStorage.setItem('verify_token', this.verificationToken);
    this.router.navigate(['/oauth']);
  }

  accessAuth() {
    this.loginService.login(this.email, this.senha).subscribe({
      next: res => {
        this.token = res.accessToken;
        this.mfaEnabled = res.mfaEnabled;
        this.verificationToken = res.verificationToken;

        localStorage.setItem('access_token', this.token);
        sessionStorage.setItem('verification_token', this.verificationToken);

        if (this.token != undefined) {
          return this.verificationAccountType()
        }

        this.router.navigate(['/oauth'])
        return;
      },
      error: err => {
        let message = err.status >= 500
          ? "Ocorreu um erro no servidor"
          : "Email e/ou senha incorretos"

        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: message,
        });
      }
    });
  }

  verificationAccountType() {
    this.loginService.verificationUserType().subscribe((res: any) => {
      if (res.userType == 'ADMIN') {
        this.router.navigate(['/sign-in'])
        return
      }
    })
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../login.service';

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
    console.log(this.email, this.senha);
    const emailSyntax: boolean = this.email.includes('@') && this.email.includes('.com');
    if (!emailSyntax) {
      alert("Email inválido");
      return;
    }

    this.loginService.login(this.email, this.senha).subscribe(res => {
      console.log(res);
      this.token = res.accessToken;
      this.mfaEnabled = res.mfaEnabled;
      this.verificationToken = res.verificationToken;

      localStorage.setItem('access_token', this.token);
      sessionStorage.setItem('verification_token', this.verificationToken);
  
      if (this.token != undefined) {
        return this.verificationAccountType()
      }

      alert("Logado como usuário ")
      this.router.navigate(['/oauth'])
      return
    });
  }

  verificationAccountType() {
   


    this.loginService.verificationUserType().subscribe((res: any) => {

      if (res.userType == 'ADMIN') {
        alert("Logado como administrador")
        this.router.navigate(['/sign-in'])
        return
      }


    })



  }

  redirect(route: string): void {
    this.router.navigate([route]);
  }
}

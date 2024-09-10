import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oauth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.scss']
})
export class OauthComponent {
  code: string = "";

  constructor(private loginService: LoginService, private router: Router) {}

  isCodeValid() {
    this.loginService.valid(this.code).subscribe((res: any) => {
      if (res.accessToken != undefined) {
        alert("Código correto!");

        sessionStorage.setItem('access_token', res.accessToken);
        
      } else {
        alert("Código inválido!");
      }
    });
  }
}

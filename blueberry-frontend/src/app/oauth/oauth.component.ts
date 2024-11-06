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
        window.location.href='https://docs.google.com/spreadsheets/d/1pKL38p1dET9g0kByacHD4JfySC1rj51XRx33gC-_m3E/edit?ouid=111232461127019262936&usp=sheets_home&ths=true'
      } else {
        alert("Código inválido!");
      }
    });
  }
}

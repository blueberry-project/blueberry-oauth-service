import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-oauth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.scss']
})
export class OauthComponent {
  code: string = "";

  constructor(private loginService: LoginService, private dashboardService: DashboardService, private router: Router) {}

  isCodeValid() {
    this.loginService.valid(this.code).subscribe({
      next: (res: any) => {
        if (res.accessToken != undefined) {
          localStorage.setItem('access_token', res.accessToken);

          this.dashboardService.getDashboards().subscribe({
            next: (res: any) => window.location.href = res[0].dashboardLink,
            error: error => {
              let message = error.status >= 500
                ? 'Ocorreu um erro no servidor.'
                : "Erro ao entrar tente novamente mais tarde"

              Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: message,
              }).then(() => {
                this.loginService.clearTokens()
                this.router.navigate(['/'])
              })
            }
          })
        }
      },
      error: error => {
        let message = error.status >= 500
          ? 'Ocorreu um erro no servidor.'
          : 'Código inválido.'

        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: message,
        });
      }
    });
  }
}

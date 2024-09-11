import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sign',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign.component.html',
  styleUrl: './sign.component.scss'
})

export class SignComponent {
  email: string = ""
  password: string = ""
  passwordSecondConfirmation: string = ""
  nome: string = ""
  cpf : string = ""
  userDocs : string = "PHYSICAL_PERSON"
  userType : string = "COMMON"

  constructor(private login: LoginService, private cookieService : CookieService, private router : Router) { };

  createAccount() {
    const validCreation: boolean = this.email.includes("@") && this.passwordSecondConfirmation == this.password;
  
    if (!validCreation) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email inválido ou senhas não coincidem!',
      });
      return;
    }
    
    this.login.create({
      name: this.nome, 
      email: this.email, 
      password: this.password,
      cpf: this.cpf, 
      userDocs: this.userDocs, 
      userType: this.userType
    }).subscribe(res => {
      sessionStorage.setItem('mfa_secret_uri', res.mfaSecretImageUri);
      Swal.fire({
        icon: 'success',
        title: 'Usuário criado!',
        text: 'O usuário foi criado com sucesso.',
      }).then(() => {
        this.router.navigate(['/create-oauth']);
      });
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Ocorreu um erro ao criar o usuário.',
      });
    });
  }
  

}


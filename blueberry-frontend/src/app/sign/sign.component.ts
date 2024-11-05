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
  email: string = "";
  password: string = "";
  passwordSecondConfirmation: string = "";
  nome: string = "";
  cpf: string = "";
  userDocs: string = "PHYSICAL_PERSON";
  userType: string = "COMMON";

  constructor(private login: LoginService, private cookieService: CookieService, private router: Router) { }

  // Função para gerar dados aleatórios
  generatePerson() {
    this.nome = this.generateName();
    this.cpf = this.generateCPF();
    this.password = "Sptech@2416#Grupo10"
    this.passwordSecondConfirmation = this.password;
    this.email = this.generateEmail(this.nome);
    this.userType = "COMMON";
    this.userDocs = "PHYSICAL_PERSON";
  }

  // Gerador de nome simples
  generateName() {
    const firstNames = ["Ana", "Carlos", "Eduardo", "Fernanda", "João", "Lucas", "Maria", "Paulo", "Rafaela"];
    const lastNames = ["Silva", "Souza", "Oliveira", "Pereira", "Almeida", "Costa", "Ferreira"];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
  }

  // Gerador de senha com 16 caracteres, incluindo maiúsculas, minúsculas, números e símbolos
  generatePassword() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%@&";
    let password = "";
    for (let i = 0; i < 16; i++) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password;
  }

  generateCPF() {
    let cpf = [];
    for (let i = 0; i < 9; i++) {
      cpf.push(Math.floor(Math.random() * 9));
    }
    cpf.push(this.calculateCPFVerifier(cpf));
    cpf.push(this.calculateCPFVerifier(cpf));
    return cpf.join("").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  calculateCPFVerifier(cpf: number[]) {
    let sum = 0;
    let weight = cpf.length + 1;
    for (let i = 0; i < cpf.length; i++) {
      sum += cpf[i] * weight--;
    }
    let verifier = 11 - (sum % 11);
    return verifier > 9 ? 0 : verifier;
  }

  // Gerador de email a partir do nome
  generateEmail(name: string) {
    const emailProviders = ["exemplo.com", "email.com", "sptech.school"];
    const provider = emailProviders[Math.floor(Math.random() * emailProviders.length)];
    return `${name.toLowerCase().replace(" ", ".")}@${provider}`;
  }

  createAccount() {
    if (this.password !== this.passwordSecondConfirmation) {
      Swal.fire('Erro', 'As senhas não coincidem!', 'error');
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


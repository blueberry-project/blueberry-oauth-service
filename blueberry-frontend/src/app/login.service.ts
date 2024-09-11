import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://18.214.203.117';

  constructor(private http: HttpClient) { }

  login(email: string, senha: string): Observable<any> {
    return this.http.post(this.apiUrl + "/authentication", { "email": email, "password": senha });
  }

  create(data : any  ): Observable<any> {

    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(this.apiUrl + "/users", {
      "name": data.name,
      "email": data.email ,
      "password": data.password ,
      "document": data.cpf,
      "userType": data.userType,
      "documentType": data.userDocs,
      "enableMfa": true
    }, { headers });
  }

  valid(code: string) {
    return this.http.post(this.apiUrl + '/authentication/verify', {

      'verificationToken': sessionStorage.getItem('verification_token'),
      'code': code
    });
  }


  verificationUserType(){
    const token = localStorage.getItem('access_token');
  
    if (!token) {
      console.error('Token não encontrado no sessionStorage');
      
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    console.log(headers);
  
    return this.http.get(this.apiUrl + '/users/profile', { headers })
  }
  

  setAccessToken(token: string): void {
    sessionStorage.setItem('access_token', token);
  }

  setVerifyToken(token: string): void {
    sessionStorage.setItem('verify_token', token);
  }

  clearTokens(): void {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('verify_token');
  }
}

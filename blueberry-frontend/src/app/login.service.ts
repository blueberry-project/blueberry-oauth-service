import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://52.200.151.98';

  constructor(private http: HttpClient) { }

  login(email: string, senha: string): Observable<any> {
    return this.http.post(this.apiUrl + "/authentication", { "email": email, "password": senha });
  }

  create(data : any  ): Observable<any> {

    const token = sessionStorage.getItem('access_token');
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
    const token = sessionStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(this.apiUrl + '/users/profile', {headers})
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

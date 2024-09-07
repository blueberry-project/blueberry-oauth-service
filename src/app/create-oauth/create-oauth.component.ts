import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-oauth',
  standalone: true,
  imports: [],
  templateUrl: './create-oauth.component.html',
  styleUrls: ['./create-oauth.component.scss']
})
export class CreateOauthComponent {
  imageToken: string = "";

  constructor(private router: Router) {}

  ngOnInit() { 
    this.imageToken = sessionStorage.getItem('mfa_secret_uri') || '';
    console.log(this.imageToken);
  }

  logoutUser() { 
    sessionStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }
}

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignComponent } from './sign/sign.component';
import { OauthComponent } from './oauth/oauth.component';
import { CreateOauthComponent } from './create-oauth/create-oauth.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent}, 
    {path: 'sign-in', component: SignComponent}, 
    {path: 'oauth', component: OauthComponent}, 
    {path: 'create-oauth', component: CreateOauthComponent}
];

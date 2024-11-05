import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // adicione isto
import { CpfMaskDirective } from './sign/cpf-mask.directive';
import { NavbarComponent } from './navbar/navbar.component';
@NgModule({
  declarations: [
    // componentes
    CpfMaskDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  
    NavbarComponent
  ],
  providers: [],
  bootstrap: [/* seu componente principal */]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // adicione isto
import { CpfMaskDirective } from './sign/cpf-mask.directive';

@NgModule({
  declarations: [
    // componentes
    CpfMaskDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  // adicione isto
  ],
  providers: [],
  bootstrap: [/* seu componente principal */]
})
export class AppModule { }

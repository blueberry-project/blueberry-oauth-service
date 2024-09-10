import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // adicione isto

@NgModule({
  declarations: [
    // componentes
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  // adicione isto
  ],
  providers: [],
  bootstrap: [/* seu componente principal */]
})
export class AppModule { }

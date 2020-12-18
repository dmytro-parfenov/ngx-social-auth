import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgxSocialAuthModule} from 'ngx-social-auth';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxSocialAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

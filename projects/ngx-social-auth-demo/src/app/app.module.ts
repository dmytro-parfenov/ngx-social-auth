import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SocialAuthModule} from 'ngx-social-auth';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SocialAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

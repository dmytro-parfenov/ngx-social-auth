import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {NgxSocialAuthModule, NgxSocialAuthProvider, NgxSocialAuthProviderType} from 'ngx-social-auth';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxSocialAuthModule.forRoot({
      providers: [
        new NgxSocialAuthProvider(NgxSocialAuthProviderType.Google, {
          client_id: '795988813952-4d4e4qcbseg2dlqulhp3c35tda8hp3om.apps.googleusercontent.com'
        }),
        new NgxSocialAuthProvider(NgxSocialAuthProviderType.Facebook, {
          appId: '1119074078473230', status: true, version: 'v9.0'
        }),
        new NgxSocialAuthProvider(NgxSocialAuthProviderType.Microsoft, {
          auth: {clientId: '3e46b8b5-7756-452c-b6b2-d744f7fe6056', postLogoutRedirectUri: 'http://localhost:4200/'}
        })
      ]
    }),
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

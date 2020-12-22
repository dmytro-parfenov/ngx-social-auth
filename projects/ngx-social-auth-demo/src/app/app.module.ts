import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {NgxSocialAuthModule, NgxSocialAuthProvider, NgxSocialAuthProviderType} from 'ngx-social-auth';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxSocialAuthModule.forRoot({
      providers: [
        new NgxSocialAuthProvider(NgxSocialAuthProviderType.Google, {
          client_id: environment.googleClientId
        }),
        new NgxSocialAuthProvider(NgxSocialAuthProviderType.Facebook, {
          appId: environment.facebookAppId, status: true, version: 'v9.0'
        }),
        new NgxSocialAuthProvider(NgxSocialAuthProviderType.Microsoft, {
          auth: {clientId: environment.microsoftClientId, postLogoutRedirectUri: environment.microsoftPostLogoutRedirect}
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

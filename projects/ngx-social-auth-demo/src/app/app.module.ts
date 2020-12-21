import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SocialAuthEntity, SocialAuthModule, SocialAuthProviderType} from 'ngx-social-auth';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SocialAuthModule.forRoot({
      entities: [
        new SocialAuthEntity(SocialAuthProviderType.Google, {
          client_id: '795988813952-4d4e4qcbseg2dlqulhp3c35tda8hp3om.apps.googleusercontent.com'
        }),
        new SocialAuthEntity(SocialAuthProviderType.Facebook, {
          appId: '1119074078473230', status: true, version: 'v6.0'
        }),
        new SocialAuthEntity(SocialAuthProviderType.Microsoft, {
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

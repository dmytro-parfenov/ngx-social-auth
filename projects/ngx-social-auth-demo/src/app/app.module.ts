import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {NgxSocialAuthModule, NgxSocialAuthProvider, NgxSocialAuthProviderType} from 'ngx-social-auth2';
import {environment} from '../environments/environment';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProviderComponent} from './provider/provider.component';
import {ProviderIconComponent} from './provider-icon/provider-icon.component';
import {CoreModule} from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    ProviderComponent,
    ProviderIconComponent
  ],
  imports: [
    BrowserAnimationsModule,
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
    MatIconModule,
    MatTooltipModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

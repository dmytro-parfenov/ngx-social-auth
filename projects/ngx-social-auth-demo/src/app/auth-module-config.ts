import {NgxSocialAuthModuleConfig, NgxSocialAuthProvider, NgxSocialAuthProviderType} from 'ngx-social-auth2';
import {environment} from '../environments/environment';

export const authModuleConfig: NgxSocialAuthModuleConfig = {
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
};

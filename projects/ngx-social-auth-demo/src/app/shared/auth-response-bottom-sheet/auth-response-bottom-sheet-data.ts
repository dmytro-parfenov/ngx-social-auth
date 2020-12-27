import {NgxSocialAuthProviderType, NgxSocialAuthResponse} from 'ngx-social-auth2';

export interface AuthResponseBottomSheetData {
  providerType: NgxSocialAuthProviderType;
  authResponse: NgxSocialAuthResponse;
}

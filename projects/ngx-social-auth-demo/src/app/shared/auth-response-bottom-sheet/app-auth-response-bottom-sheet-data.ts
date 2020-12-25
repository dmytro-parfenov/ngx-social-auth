import {NgxSocialAuthProviderType, NgxSocialAuthResponse} from 'ngx-social-auth2';

export interface AppAuthResponseBottomSheetData {
  providerType: NgxSocialAuthProviderType;
  authResponse: NgxSocialAuthResponse;
}

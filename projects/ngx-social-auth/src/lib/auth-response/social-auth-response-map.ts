/* tslint:disable:max-line-length */
import {NgxSocialAuthProviderType} from '../social-auth-provider-type.enum';

export interface NgxSocialAuthResponseMap {
  /**
   * @see https://developers.google.com/identity/sign-in/web/reference#gapiauth2authresponse
   */
  readonly [NgxSocialAuthProviderType.Google]: any;
  /**
   * @see https://developers.facebook.com/docs/reference/javascript/FB.getAuthResponse
   */
  readonly [NgxSocialAuthProviderType.Facebook]: any;
  /**
   * @see https://azuread.github.io/microsoft-authentication-library-for-js/ref/msal-common/classes/_src_response_authenticationresult_.authenticationresult.html
   */
  readonly [NgxSocialAuthProviderType.Microsoft]: any;
}

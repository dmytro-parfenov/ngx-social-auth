/* tslint:disable:max-line-length */
/**
 * Represents an object contains auth response
 */
export interface NgxSocialAuthResponse<R = any> {
  /**
   * Possible responses
   *
   * For {@link NgxSocialAuthProviderType.Google} - see {@link https://developers.google.com/identity/sign-in/web/reference#gapiauth2authresponse}
   *
   * For {@link NgxSocialAuthProviderType.Facebook} - see {@link https://developers.facebook.com/docs/reference/javascript/FB.getAuthResponse}
   *
   * For {@link NgxSocialAuthProviderType.Microsoft} - see {@link https://azuread.github.io/microsoft-authentication-library-for-js/ref/msal-common/classes/_src_response_authenticationresult_.authenticationresult.html}
   */
  providerResponse: R;
}

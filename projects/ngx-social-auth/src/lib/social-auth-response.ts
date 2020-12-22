/* tslint:disable:max-line-length */
/**
 * Represents an object contains auth data
 */
export interface NgxSocialAuthResponse<C = any> {
  /**
   * Possible responses
   *
   * For {@link NgxSocialAuthProviderType.Google} - see {@link https://developers.google.com/identity/sign-in/web/reference#gapiauth2authresponse}
   *
   * For {@link NgxSocialAuthProviderType.Facebook} - see {@link https://developers.facebook.com/docs/reference/javascript/FB.getAuthResponse}
   *
   * For {@link NgxSocialAuthProviderType.Microsoft} - see {@link https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_authresponse_.html#authresponse}
   */
  credentials: C;
}

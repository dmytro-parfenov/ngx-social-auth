/* tslint:disable:max-line-length */
/**
 * Represents an object contains auth data
 */
export interface SocialAuthResponse<C = any> {
  /**
   * Possible responses
   *
   * For {@link SocialAuthProviderType.Google} - see {@link https://developers.google.com/identity/sign-in/web/reference#gapiauth2authresponse}
   *
   * For {@link SocialAuthProviderType.Facebook} - see {@link https://developers.facebook.com/docs/reference/javascript/FB.getAuthResponse}
   *
   * For {@link SocialAuthProviderType.Microsoft} - see {@link https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_authresponse_.html#authresponse}
   */
  credentials: C;
}

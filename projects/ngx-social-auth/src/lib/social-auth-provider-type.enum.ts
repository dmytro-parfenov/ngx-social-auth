/**
 * All available auth providers
 */
export enum NgxSocialAuthProviderType {
  /**
   * @see https://developers.google.com/identity/sign-in/web/reference
   */
  Google = 'Google',
  /**
   * @see https://developers.facebook.com/docs/javascript
   */
  Facebook = 'Facebook',
  /**
   * @see https://azuread.github.io/microsoft-authentication-library-for-js/ref/msal-browser/
   */
  Microsoft = 'Microsoft'
}
